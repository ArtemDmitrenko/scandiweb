import React from 'react';
import PropTypes from 'prop-types';

import Attribute from 'components/Attribute/Attribute';
import setPriceInCurrency from 'utils/setPriceInCurrency';

import styles from './productDescription.module.scss';

class ProductDescription extends React.Component {
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
    const { currency, prices } = this.props;
    const currentPrice =
      prices.length === 0 || currency === '' ? '' : setPriceInCurrency(prices, currency);
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

  render() {
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
    return (
      <div className={styles.container}>
        <p className={this.stylesBrand()}>{brand}</p>
        <p className={this.stylesName()}>{name}</p>
        {isPriceOnTop && (
          <p className={this.stylesPrice()}>
            {currency}
            {setPriceInCurrency(prices, currency)}
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
  prices: PropTypes.instanceOf(Array).isRequired,
  attributes: PropTypes.instanceOf(Array).isRequired,
  handleAttributeChange: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired
};

ProductDescription.defaultProps = {
  isPriceOnTop: false
};

export default ProductDescription;
