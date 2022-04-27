import React from 'react';
import PropTypes from 'prop-types';
import basket from './images/basket.svg';
import styles from './cartBasket.module.scss';

class CartBasket extends React.Component {
  stylesOfBasket = () => {
    const { amount } = this.props;
    return `${styles.total} ${!amount && styles.hidden}`;
  };

  render() {
    const { amount } = this.props;
    return (
      <button type="button" className={styles.button}>
        <img src={basket} className={styles.img} alt="basket" />
        <span className={this.stylesOfBasket()}>{amount}</span>
      </button>
    );
  }
}

CartBasket.propTypes = {
  amount: PropTypes.number.isRequired
};

export default CartBasket;
