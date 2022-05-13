import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import ThumbSlider from 'components/ThumbSlider/ThumbSlider';
import ProductDescription from 'components/ProductDescription/ProductDescription';
import Button from 'components/Button/Button';
import { ADD_PRODUCT } from 'redux/cartProducts/cartProductsActions';
import { fetchProduct } from 'api/fetch';

import styles from './product.module.scss';

function withParams(Component) {
  return function wrapper(props) {
    return <Component {...props} params={useParams()} />;
  };
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
    const productWithDefAttributes = Product.setDefaultAttributes(product);
    this.setState({
      product: productWithDefAttributes
    });
  }

  static setDefaultAttributes = (product) => {
    if (product.attributes || product.attributes.length > 0) {
      const defaultAttributes = product.attributes.map((attribute) => {
        attribute.items[0].isChecked = true;
        return attribute;
      });
      product.attributes = defaultAttributes;
    }
    return product;
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
    e.preventDefault();
    const { dispatch } = this.props;
    const { product } = this.state;
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
      inStock,
      name = '',
      prices = [],
      attributes = [],
      description
    } = product;
    const sanitizerDescription = DOMPurify.sanitize;
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
              inStock={inStock}
            />
            {inStock && (
              <div className={styles.button}>
                <Button isButton buttonType="submit" text="add to cart" type="solid" />
              </div>
            )}
          </form>
          <div
            className={styles.descriptionText}
            dangerouslySetInnerHTML={{ __html: sanitizerDescription(description) }}
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
    currency: store.currencyReducer.currency
  };
};

export default connect(mapStateToProps)(withParams(Product));
