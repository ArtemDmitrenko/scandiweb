/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import Attribute from '../Attribute/Attribute';
import setPriceInCurrency from '../../utils/setPriceInCurrency';
import styles from './productDescription.module.scss';

class ProductDescription extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   amount: props.defAmount
  //   // };
  // }

  stylesBrand = () => {
    const { size } = this.props;
    return `${styles.brand} ${size === 'small' ? styles.brandSmall : styles.brandBig}`;
  };

  stylesName = () => {
    const { size } = this.props;
    return `${styles.name} ${size === 'small' ? styles.nameSmall : styles.nameBig}`;
  };

  stylesPrice = () => {
    const { size } = this.props;
    return `${styles.price} ${size === 'small' ? styles.priceSmall : styles.priceBig}`;
  };

  renderBigPrice = () => {
    // eslint-disable-next-line react/prop-types
    const { currency, prices } = this.props;
    const currentPrice =
      prices.length === 0 || currency === '' ? '' : setPriceInCurrency(prices, currency);

    // return priceArr.find((item) => item.currency.symbol === currency).amount;

    return (
      <>
        <p className={styles.titlePrice}>Price:</p>
        <p className={this.stylesPrice()}>
          {currency}
          {currentPrice}
        </p>
      </>
    );
  };

  // renderPrice = (priceArr) => {
  //   // eslint-disable-next-line react/prop-types
  //   const { currency } = this.props;
  //   console.log(priceArr);
  //   return priceArr.find((item) => item.currency.symbol === currency).amount;
  // };

  render() {
    // eslint-disable-next-line react/prop-types
    const {
      size,
      isPriceOnTop,
      nameForRadioButtons,
      brand,
      name,
      prices,
      attributes,
      currency,
      handleAttributeChange
    } = this.props;
    console.log(attributes);
    return (
      <div className={styles.container}>
        <p className={this.stylesBrand()}>{brand}</p>
        <p className={this.stylesName()}>{name}</p>
        {isPriceOnTop && (
          <p className={this.stylesPrice()}>
            {currency}
            {setPriceInCurrency(prices, currency)}
            {/* {this.renderPrice(prices)} */}
          </p>
        )}
        <ul className={styles.attributes}>
          {attributes.map((item) => {
            return (
              <li key={item.name}>
                <Attribute
                  nameForRadioButtons={nameForRadioButtons}
                  type={item.type}
                  size={size}
                  name={item.name}
                  title={item.name}
                  items={item.items}
                  handleAttributeChange={handleAttributeChange}
                />
              </li>
            );
          })}
        </ul>
        {!isPriceOnTop && this.renderBigPrice()}
      </div>
    );
  }
}

ProductDescription.propTypes = {
  nameForRadioButtons: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['big', 'small']).isRequired,
  isPriceOnTop: PropTypes.bool,
  brand: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  prices: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  attributes: PropTypes.array.isRequired,
  // eslint-disable-next-line react/require-default-props
  handleAttributeChange: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  currency: PropTypes.string.isRequired
};

ProductDescription.defaultProps = {
  isPriceOnTop: false
};

// const mapStateToProps = (store) => {
//   return {
//     currency: store.currencyReducer.currency
//   };
// };

// export default connect(mapStateToProps)(ProductDescription);

export default ProductDescription;
