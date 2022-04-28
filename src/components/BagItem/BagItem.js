import React from 'react';
import PropTypes from 'prop-types';
import styles from './bagItem.module.scss';
import ProductDescription from '../ProductDescription/ProductDescription';
import Counter from '../Counter/Counter';

class BagItem extends React.Component {
  render() {
    const { size, product } = this.props;

    return (
      <div className={styles.item}>
        <div className={styles.descriptionContainer}>
          <ProductDescription size={size} product={product} />
        </div>
        <div className={styles.counterContainer}>
          <Counter maxAmount={10} />
        </div>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087"
            alt="Product"
          />
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
