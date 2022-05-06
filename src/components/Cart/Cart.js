/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  SET_ATTRIBUTE
} from '../../redux/cartProducts/cartProductsActions';
import getFormattedData from '../../utils/getFormattedData';

import calcTotalSum from '../../utils/calcTotalSum';
import calcAmountOfItems from '../../utils/calcAmountOfItems';

// import ProductDescription from '../ProductDescription/ProductDescription';
import styles from './cart.module.scss';
// import Counter from '../Counter/Counter';
// import Slider from '../Slider/Slider';
import BagItem from '../BagItem/BagItem';
import Button from '../Button/Button';

// const gallery = [
//   'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087',
//   'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087',
//   'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087',
//   'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087',
//   'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087'
// ];

class Cart extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  handleAmountChange = (product, action) => {
    // eslint-disable-next-line react/prop-types
    const { dispatch } = this.props;
    switch (action) {
      case 'increase':
        dispatch({
          type: ADD_PRODUCT,
          payload: product
        });
        break;
      case 'decrease':
        dispatch({
          type: REMOVE_PRODUCT,
          payload: product
        });
        break;
      default:
    }
  };

  // eslint-disable-next-line class-methods-use-this
  handleAttributeChange = (id, name, value) => {
    console.log(id, name, value);
    const { products, dispatch } = this.props;
    const changingProduct = products.filter((product) => product.id === id);
    const { attributes } = changingProduct[0];
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
    changingProduct.attributes = newArr;
    dispatch({
      type: SET_ATTRIBUTE,
      payload: changingProduct
    });
  };

  handleButtonCheckoutClick = () => {
    const { products } = this.props;
    const formatedData = getFormattedData(products);
    alert(JSON.stringify(formatedData));
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { size, products, currency } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.title}>Cart</div>
        <ul className={styles.list}>
          {products.length > 0 ? (
            products.map((product) => (
              <li className={styles.product} key={product.name}>
                <BagItem
                  componentLocation="cart"
                  size={size}
                  product={product}
                  handleAmountChange={this.handleAmountChange}
                  handleAttributeChange={(name, value) =>
                    this.handleAttributeChange(product.id, name, value)
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
  size: PropTypes.string.isRequired
  // eslint-disable-next-line react/forbid-prop-types
  // products: PropTypes.array.isRequired
};

// ProductsList.defaultProps = {
//   defAmount: 0
// };

const mapStateToProps = (store) => {
  return {
    products: store.cartProductsReducer.products,
    currency: store.currencyReducer.currency
  };
};

export default connect(mapStateToProps)(Cart);

// export default Cart;
