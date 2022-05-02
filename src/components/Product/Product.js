/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import ThumbSlider from '../ThumbSlider/ThumbSlider';
import styles from './product.module.scss';
import ProductDescription from '../ProductDescription/ProductDescription';
import Button from '../Button/Button';

class Product extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     amount: props.defAmount
  //   };
  // }

  render() {
    // const { amount } = this.state;
    const {
      product: { gallery, brand, name, prices, attributes }
    } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.images}>
          <ThumbSlider images={gallery} />
        </div>
        <div className={styles.productDescription}>
          <ProductDescription
            size="big"
            brand={brand}
            name={name}
            prices={prices}
            attributes={attributes}
          />
          <div className={styles.button}>
            <Button isButton buttonType="button" text="add to cart" type="solid" />
          </div>
          <p className={styles.descriptionText}>
            Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic
            cocktail dresses and party dresses from all your favorite brands.
          </p>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.object.isRequired
};

// ProductDescription.defaultProps = {
//   defAmount: 0
// };

export default Product;
