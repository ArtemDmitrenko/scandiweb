import React from 'react';
import PropTypes from 'prop-types';

import ProductDescription from 'components/ProductDescription/ProductDescription';
import Counter from 'components/Counter/Counter';
import Slider from 'components/Slider/Slider';

import styles from './bagItem.module.scss';

class BagItem extends React.Component {
  handleAmountChange = (action) => {
    const { handleAmountChange, product } = this.props;
    handleAmountChange(product.id, action);
  };

  render() {
    const {
      size,
      product: { id, brand, name, prices, attributes, gallery, value },
      currency,
      componentLocation,
      handleAttributeChange
    } = this.props;
    return (
      <div className={styles.item}>
        <div className={styles.descriptionContainer}>
          <ProductDescription
            nameForRadioButtons={id + componentLocation}
            size={size}
            isPriceOnTop
            brand={brand}
            name={name}
            prices={prices}
            attributes={attributes}
            currency={currency}
            handleAttributeChange={handleAttributeChange}
          />
        </div>
        <div className={styles.counterImage}>
          <div className={styles.counterContainer}>
            <Counter
              maxAmount={10}
              size={size}
              defAmount={value}
              handleAmountChange={this.handleAmountChange}
            />
          </div>
          {size === 'small' ? (
            <div className={styles.imageContainer}>
              <img className={styles.image} src={gallery[0]} alt="Product" />
            </div>
          ) : (
            <div className={styles.slider}>
              <Slider images={gallery} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

BagItem.propTypes = {
  size: PropTypes.string.isRequired,
  componentLocation: PropTypes.string.isRequired,
  product: PropTypes.instanceOf(Object).isRequired,
  handleAmountChange: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  handleAttributeChange: PropTypes.func.isRequired
};

export default BagItem;
