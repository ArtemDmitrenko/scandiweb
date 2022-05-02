import React from 'react';
import PropTypes from 'prop-types';
import BagItem from '../BagItem/BagItem';
import Button from '../Button/Button';
import styles from './bag.module.scss';

class Bag extends React.Component {
  render() {
    const { size, products } = this.props;

    return (
      <div className={styles.bag}>
        <p className={styles.title}>
          My Bag, <span className={styles.amountOfItems}>3 items</span>
        </p>
        <ul className={styles.listOfProducts}>
          {products.map((product) => (
            <li className={styles.product} key={product.name}>
              <BagItem size={size} product={product} />
            </li>
          ))}
        </ul>
        <div className={styles.sum}>
          <p className={styles.totalText}>Total</p>
          <p className={styles.totalPrice}>$200.00</p>
        </div>
        <div className={styles.buttonsContainer}>
          <Button isButton={false} text="view bag" type="bordered" href="/" />
          <Button isButton buttonType="submit" text="check out" type="solid" />
        </div>
      </div>
    );
  }
}

Bag.propTypes = {
  size: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.array.isRequired
};

export default Bag;
