import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BagItem from 'components/BagItem/BagItem';
import Button from 'components/Button/Button';
import {
  INCREASE_PRODUCT_QUANTITY,
  DECREASE_PRODUCT_QUANTITY,
  SET_ATTRIBUTE
} from 'redux/cartProducts/cartProductsActions';
import getFormattedData from 'utils/getFormattedData';
import calcTotalSum from 'utils/calcTotalSum';
import calcAmountOfItems from 'utils/calcAmountOfItems';

import styles from './cart.module.scss';

class Cart extends React.Component {
  handleAmountChange = (index, action) => {
    const { dispatch } = this.props;
    switch (action) {
      case 'increase':
        dispatch({
          type: INCREASE_PRODUCT_QUANTITY,
          payload: index
        });
        break;
      case 'decrease':
        dispatch({
          type: DECREASE_PRODUCT_QUANTITY,
          payload: index
        });
        break;
      default:
    }
  };

  handleAttributeChange = (index, name, value) => {
    const { dispatch } = this.props;
    const payload = {
      index,
      name,
      value
    };
    dispatch({
      type: SET_ATTRIBUTE,
      payload
    });
  };

  handleButtonCheckoutClick = () => {
    const { products } = this.props;
    const formattedData = getFormattedData(products);
    alert(JSON.stringify(formattedData));
  };

  // eslint-disable-next-line class-methods-use-this
  setKey = (product, index) => {
    const { name, attributes } = product;
    const attributesInString = JSON.stringify(attributes);
    return `${name}${attributesInString}${index}`;
  };

  render() {
    const { size, products, currency } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.title}>Cart</div>
        <ul className={styles.list}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <li className={styles.product} key={this.setKey(product, index)}>
                <BagItem
                  componentLocation="cart"
                  index={index}
                  size={size}
                  product={product}
                  handleAmountChange={(action) => this.handleAmountChange(index, action)}
                  handleAttributeChange={(name, value) =>
                    this.handleAttributeChange(index, name, value)
                  }
                  currency={currency}
                />
              </li>
            ))
          ) : (
            <p className={styles.emptyBag}>Your cart is empty</p>
          )}
        </ul>
        {products.length > 0 && (
          <>
            <p className={styles.tax}>
              Tax: <span className={styles.value}>{currency}15.00</span>
            </p>
            <p className={styles.quantity}>
              Qty: <span className={styles.value}>{calcAmountOfItems(products)}</span>
            </p>
            <p className={styles.total}>
              Total:{' '}
              <span className={styles.value}>
                {currency}
                {calcTotalSum(products, currency)}
              </span>
            </p>
            <div className={styles.button}>
              <Button
                isButton
                buttonType="button"
                text="order"
                type="solid"
                onClick={this.handleButtonCheckoutClick}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

Cart.propTypes = {
  size: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  products: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (store) => {
  return {
    products: store.cartProductsReducer.products,
    currency: store.currencyReducer.currency
  };
};

export default connect(mapStateToProps)(Cart);
