/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';

// import PropTypes from 'prop-types';
import ThumbSlider from '../ThumbSlider/ThumbSlider';

import styles from './product.module.scss';
import ProductDescription from '../ProductDescription/ProductDescription';
import Button from '../Button/Button';
import { ADD_PRODUCT } from '../../redux/cartProducts/cartProductsActions';

function withParams(Component) {
  // eslint-disable-next-line prettier/prettier
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
    const { id } = this.props.params;
    const product = await this.fetchProduct(id);
    this.setDefaultAttributes(product);
    this.setState({
      product
    });
  }

  setDefaultAttributes = (product) => {
    product.attributes.forEach((attribute) => {
      // eslint-disable-next-line no-param-reassign
      attribute.items[0].isChecked = true;
    });
    this.setState({
      product
    });
  };

  fetchProduct = async (id) => {
    try {
      const { data } = await axios({
        url: 'http://localhost:4000/graphql',
        method: 'post',
        data: {
          query: `
          query Product($id: String!) {
            product(id: $id) {
              id, name, gallery, description, attributes {id, name, type, items {id, displayValue, value}}, prices {amount, currency {symbol}}, brand
            }
          }          
        `,
          variables: {
            id
          }
        }
      });
      return data.data.product;
    } catch (err) {
      console.log(err.message);
    }
  };

  handleAttributeChange = (name, value) => {
    const { product } = this.state;
    const { attributes } = product;
    const newArr = attributes.map((item) => {
      if (item.name === name) {
        item.items.forEach((attributeValue) => {
          if (attributeValue.displayValue === value) {
            // eslint-disable-next-line no-param-reassign
            attributeValue.isChecked = true;
          } else if (attributeValue.isChecked) {
            // eslint-disable-next-line no-param-reassign
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

  // renderDescription = (description) => {
  //   this.descriptionRef.innerHTML = description;
  // };

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

// Product.propTypes = {
//   // eslint-disable-next-line react/forbid-prop-types
//   // eslint-disable-next-line react/forbid-prop-types
//   product: PropTypes.object.isRequired
// };

// ProductDescription.defaultProps = {
//   defAmount: 0
// };

const mapStateToProps = (store) => {
  return {
    products: store.cartProductsReducer.products,
    currency: store.currencyReducer.currency
  };
};

export default connect(mapStateToProps)(withParams(Product));

// export default withParams(Product);
// export default Product;
