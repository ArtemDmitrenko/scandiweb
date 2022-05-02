/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
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
  render() {
    const { size, products } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.title}>Cart</div>
        <ul className={styles.list}>
          {products.map((product) => (
            <li className={styles.product} key={product.name}>
              <BagItem size={size} product={product} />
            </li>
          ))}
        </ul>
        <p className={styles.tax}>
          Tax: <span className={styles.value}>$15.00</span>
        </p>
        <p className={styles.quantity}>
          Qty: <span className={styles.value}>3</span>
        </p>
        <p className={styles.total}>
          Total: <span className={styles.value}>$200.00</span>
        </p>
        <div className={styles.button}>
          <Button isButton buttonType="button" text="order" type="solid" />
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  size: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.array.isRequired
};

// ProductsList.defaultProps = {
//   defAmount: 0
// };

export default Cart;
