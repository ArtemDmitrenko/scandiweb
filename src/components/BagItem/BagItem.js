import React from 'react';
import PropTypes from 'prop-types';
import styles from './bagItem.module.scss';
import ProductDescription from '../ProductDescription/ProductDescription';
import Counter from '../Counter/Counter';
import Slider from '../Slider/Slider';

class BagItem extends React.Component {
  render() {
    const {
      size,
      product: { brand, name, prices, attributes, gallery }
    } = this.props;

    return (
      <div className={styles.item}>
        <div className={styles.descriptionContainer}>
          <ProductDescription
            size={size}
            isPriceOnTop
            brand={brand}
            name={name}
            prices={prices}
            attributes={attributes}
          />
        </div>
        <div className={styles.counterImage}>
          <div className={styles.counterContainer}>
            <Counter maxAmount={10} size={size} />
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
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.object.isRequired
};

export default BagItem;
