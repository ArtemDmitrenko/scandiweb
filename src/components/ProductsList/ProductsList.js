/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchProduct } from 'api/fetch';
import setPriceInCurrency from 'utils/setPriceInCurrency';
import { ADD_PRODUCT } from 'redux/cartProducts/cartProductsActions';
import Card from 'components/Card/Card';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

import styles from './productsList.module.scss';

class ProductsList extends React.Component {
  handleClickOnButton = async (id, e) => {
    e.preventDefault();
    const product = await fetchProduct(id);
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

  render() {
    const { products, currency, areProductsLoading } = this.props;
    return areProductsLoading ? (
      <LoadingSpinner />
    ) : (
      <div className={styles.container}>
        {products && <h1 className={styles.title}>{this.props.products.name}</h1>}
        <ul className={styles.products}>
          {products && products.products.length > 0 ? (
            products.products.map(({ id, brand, name, prices, inStock, gallery }) => {
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
  products: PropTypes.instanceOf(Object).isRequired,
  currency: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  areProductsLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (store) => {
  return {
    currency: store.currencyReducer.currency
  };
};

export default connect(mapStateToProps)(ProductsList);
