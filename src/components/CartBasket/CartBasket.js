import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import OverlayContext from 'Context/OverlayContext';
import {
  INCREASE_PRODUCT_QUANTITY,
  DECREASE_PRODUCT_QUANTITY,
  SET_ATTRIBUTE
} from 'redux/cartProducts/cartProductsActions';
import Bag from 'components/Bag/Bag';
import calcAmountOfItems from 'utils/calcAmountOfItems';
import getFormattedData from 'utils/getFormattedData';

import basket from './images/basket.svg';
import styles from './cartBasket.module.scss';

class CartBasket extends React.Component {
  constructor(props) {
    super(props);
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
    setOverlay();
  };

  handleClickOutOfMenu = (e) => {
    const { setOverlay, overlayProducts } = this.context;
    if (!this.menuRef.current.contains(e.target) && overlayProducts) {
      setOverlay();
    }
  };

  stylesOfBasket = () => {
    const { products } = this.props;
    return `${styles.total} ${products.length === 0 && styles.hidden}`;
  };

  handleAmountChange = (id, action) => {
    // eslint-disable-next-line react/prop-types
    const { dispatch } = this.props;
    switch (action) {
      case 'increase':
        dispatch({
          type: INCREASE_PRODUCT_QUANTITY,
          payload: id
        });
        break;
      case 'decrease':
        dispatch({
          type: DECREASE_PRODUCT_QUANTITY,
          payload: id
        });
        break;
      default:
    }
  };

  handleButtonViewBagClick = () => {
    const { setOverlay } = this.context;
    setOverlay();
  };

  handleButtonCheckoutClick = () => {
    const { setOverlay } = this.context;
    const { products } = this.props;
    setOverlay();
    const formatedData = getFormattedData(products);
    alert(JSON.stringify(formatedData));
  };

  // eslint-disable-next-line class-methods-use-this
  handleAttributeChange = (idProduct, name, value) => {
    // eslint-disable-next-line react/prop-types
    const { dispatch } = this.props;
    const payload = {
      idProduct,
      name,
      value
    };

    // const productsCopy = products.map((item) => ({ ...item }));

    // const changingProduct = productsCopy.filter((product) => product.id === idProduct);
    // const { attributes } = changingProduct[0];
    // const newArr = attributes.map((item) => {
    //   if (item.name === name) {
    //     item.items.forEach((attributeValue) => {
    //       if (attributeValue.displayValue === value) {
    //         // eslint-disable-next-line no-param-reassign
    //         attributeValue.isChecked = true;
    //       } else if (attributeValue.isChecked) {
    //         // eslint-disable-next-line no-param-reassign
    //         delete attributeValue.isChecked;
    //       }
    //     });
    //   }
    //   return item;
    // });
    // changingProduct[0].attributes = newArr;
    // console.log(changingProduct[0]);
    dispatch({
      type: SET_ATTRIBUTE,
      payload
    });
    // this.setState({
    //   product
    // });
  };

  render() {
    const { products, currency } = this.props;
    const { overlayProducts } = this.context;

    return (
      <div className={styles.cartBasket} ref={this.menuRef}>
        <button type="button" className={styles.button} onClick={this.handleClickOnMenu}>
          <img src={basket} className={styles.img} alt="basket" />
          <span className={this.stylesOfBasket()}>{calcAmountOfItems(products)}</span>
        </button>
        {products.length > 0 ? (
          <div className={overlayProducts ? styles.list : styles.hidden}>
            <Bag
              size="small"
              products={products}
              handleAmountChange={this.handleAmountChange}
              handleAttributeChange={this.handleAttributeChange}
              currency={currency}
              handleButtonViewBagClick={this.handleButtonViewBagClick}
              handleButtonCheckoutClick={this.handleButtonCheckoutClick}
            />
          </div>
        ) : (
          <div className={overlayProducts ? styles.emptyList : styles.hidden}>
            Your cart is empty
          </div>
        )}
      </div>
    );
  }
}

CartBasket.contextType = OverlayContext;

CartBasket.propTypes = {
  // amount: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired
};

const mapStateToProps = (store) => {
  return {
    products: store.cartProductsReducer.products,
    currency: store.currencyReducer.currency
  };
};

export default connect(mapStateToProps)(CartBasket);

// export default CartBasket;
