import React from 'react';
import PropTypes from 'prop-types';
import OverlayContext from '../../Context/OverlayContext';
import basket from './images/basket.svg';
import styles from './cartBasket.module.scss';
import Bag from '../Bag/Bag';

class CartBasket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false
    };
    this.menuRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutOfMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutOfMenu);
  }

  handleClickOnMenu = () => {
    const { setOverlay } = this.context;
    this.setState((prevState) => ({
      isOpened: !prevState.isOpened
    }));
    setOverlay();
  };

  handleClickOutOfMenu = (e) => {
    const { isOpened } = this.state;
    const { setOverlay } = this.context;
    if (!this.menuRef.current.contains(e.target) && isOpened) {
      this.setState({
        isOpened: false
      });
      setOverlay();
    }
  };

  stylesOfBasket = () => {
    const { amount } = this.props;
    return `${styles.total} ${!amount && styles.hidden}`;
  };

  render() {
    const { amount, products } = this.props;
    const { isOpened } = this.state;
    return (
      <div className={styles.cartBasket} ref={this.menuRef}>
        <button type="button" className={styles.button} onClick={this.handleClickOnMenu}>
          <img src={basket} className={styles.img} alt="basket" />
          <span className={this.stylesOfBasket()}>{amount}</span>
        </button>
        <div className={isOpened ? styles.list : styles.hidden}>
          <Bag size="small" products={products} />
        </div>
      </div>
    );
  }
}

CartBasket.contextType = OverlayContext;

CartBasket.propTypes = {
  amount: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.array.isRequired
};

export default CartBasket;
