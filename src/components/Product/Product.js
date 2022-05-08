/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ThumbSlider from 'components/ThumbSlider/ThumbSlider';
import ProductDescription from 'components/ProductDescription/ProductDescription';
import Button from 'components/Button/Button';
import { ADD_PRODUCT } from 'redux/cartProducts/cartProductsActions';
import { fetchProduct } from 'fetch/fetch';

import styles from './product.module.scss';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }

  async componentDidMount() {
    const {
      params: { id }
    } = this.props;
    const product = await fetchProduct(id);
    this.setDefaultAttributes(product);
    this.setState({
      product
    });
  }

  setDefaultAttributes = (product) => {
    product.attributes.forEach((attribute) => {
      attribute.items[0].isChecked = true;
    });
    this.setState({
      product
    });
  };

  handleAttributeChange = (name, value) => {
    const { product } = this.state;
    const { attributes } = product;
    const newArr = attributes.map((item) => {
      if (item.name === name) {
        item.items.forEach((attributeValue) => {
          if (attributeValue.displayValue === value) {
            attributeValue.isChecked = true;
          } else if (attributeValue.isChecked) {
            delete attributeValue.isChecked;
          }
        });
      }
      return item;
    });
    product.attributes = newArr;
    this.setState({
      product
    });
  };

  handleSubmit = (e) => {
    const { dispatch } = this.props;
    const { product } = this.state;
    e.preventDefault();
    dispatch({
      type: ADD_PRODUCT,
      payload: product
    });
  };

  render() {
    const { currency } = this.props;
    const { product } = this.state;
    const {
      id,
      gallery,
      brand = '',
      name = '',
      prices = [],
      attributes = [],
      description
    } = product;
    const componentLocation = 'product';
    return (
      <div className={styles.container}>
        <div className={styles.images}>
          {gallery && gallery.length > 1 ? (
            <ThumbSlider images={gallery} />
          ) : (
            gallery && (
              <div className={styles.mainImageContainer}>
                <img className={styles.image} src={gallery[0]} alt="Product" />
              </div>
            )
          )}
        </div>
        <div className={styles.productDescription}>
          <form onSubmit={this.handleSubmit}>
            <ProductDescription
              nameForRadioButtons={id + componentLocation}
              size="big"
              brand={brand}
              name={name}
              prices={prices}
              attributes={attributes}
              handleAttributeChange={this.handleAttributeChange}
              currency={currency}
            />
            <div className={styles.button}>
              <Button isButton buttonType="submit" text="add to cart" type="solid" />
            </div>
          </form>
          <div
            className={styles.descriptionText}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  params: PropTypes.instanceOf(Object).isRequired,
  currency: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (store) => {
  return {
    products: store.cartProductsReducer.products,
    currency: store.currencyReducer.currency
  };
};

export default connect(mapStateToProps)(withParams(Product));
