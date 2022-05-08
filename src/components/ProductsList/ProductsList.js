/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import setPriceInCurrency from 'utils/setPriceInCurrency';
import { ADD_PRODUCT } from 'redux/cartProducts/cartProductsActions';
import Card from 'components/Card/Card';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

import styles from './productsList.module.scss';

class ProductsList extends React.Component {
  handleClickOnButton = async (id, e) => {
    e.preventDefault();
    const product = await this.fetchProduct(id);
    const productWithSetAttributes = this.setDefaultAttributes(product);
    const { dispatch } = this.props;
    dispatch({
      type: ADD_PRODUCT,
      payload: productWithSetAttributes
    });
  };

  setDefaultAttributes = (product) => {
    product.attributes.forEach((attribute) => {
      // eslint-disable-next-line no-param-reassign
      attribute.items[0].isChecked = true;
    });
    return product;
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

  render() {
    const {
      products: { products },
      currency,
      areProductsLoading
    } = this.props;
    return areProductsLoading ? (
      <LoadingSpinner />
    ) : (
      <div className={styles.container}>
        {products && <h1 className={styles.title}>{this.props.products.name}</h1>}
        <ul className={styles.products}>
          {products.length > 0 ? (
            products.map(({ id, brand, name, prices, inStock, gallery }) => {
              return (
                <li className={styles.product} key={id}>
                  <Card
                    id={id}
                    brand={brand}
                    inStock={inStock}
                    imgSrc={gallery[0]}
                    name={name}
                    price={setPriceInCurrency(prices, currency)}
                    currency={currency}
                    handleClickOnButton={(e) => this.handleClickOnButton(id, e)}
                  />
                </li>
              );
            })
          ) : (
            <p className={styles.text}>
              Sorry, but there are no products in this group at the moment
            </p>
          )}
        </ul>
      </div>
    );
  }
}

ProductsList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.object.isRequired
};

// ProductsList.defaultProps = {
//   defAmount: 0
// };

const mapStateToProps = (store) => {
  return {
    currency: store.currencyReducer.currency
    // productsInBag: store.cartProductsReducer.products
  };
};

export default connect(mapStateToProps)(ProductsList);

// export default ProductsList;

// export default withParams(ProductsList);

// export default ProductsList;
