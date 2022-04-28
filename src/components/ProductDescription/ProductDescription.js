import React from 'react';
import PropTypes from 'prop-types';
import Attribute from '../Attribute/Attribute';
import styles from './productDescription.module.scss';

class ProductDescription extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     amount: props.defAmount
  //   };
  // }

  // increase = () => {
  //   this.setState((prevState) => ({
  //     amount: prevState.amount + 1
  //   }));
  // };

  // decrease = () => {
  //   this.setState((prevState) => ({
  //     amount: prevState.amount - 1
  //   }));
  // };
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

  renderBigPrice = () => (
    <>
      <p className={styles.titlePrice}>Price:</p>
      <p className={this.stylesPrice()}>$50.00</p>
    </>
  );

  render() {
    // const { amount } = this.state;
    const {
      size,
      product: { brand, name, prices, attributes }
    } = this.props;
    return (
      <div className={styles.container}>
        <p className={this.stylesBrand()}>{brand}</p>
        <p className={this.stylesName()}>{name}</p>
        {size === 'small' && <p className={this.stylesPrice()}>${prices[0].amount}</p>}
        <ul className={styles.attributes}>
          {attributes.map((item) => {
            return (
              <li key={item.name}>
                <Attribute
                  type={item.type}
                  size={size}
                  name={item.name}
                  title={item.name}
                  items={item.items}
                />
              </li>
            );
          })}
        </ul>
        {size === 'big' && this.renderBigPrice()}
      </div>
    );
  }
}

ProductDescription.propTypes = {
  size: PropTypes.oneOf(['big', 'small']).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.object.isRequired
  // product: PropTypes.objectOf(
  //   PropTypes.shape({
  //     name: PropTypes.string.isRequired,
  //     brand: PropTypes.string.isRequired,
  //     // eslint-disable-next-line react/forbid-prop-types
  //     prices: PropTypes.array.isRequired,
  //     attributes: PropTypes.arrayOf(
  //       PropTypes.shape({
  //         name: PropTypes.string.isRequired,
  //         type: PropTypes.string.isRequired,
  //         items: PropTypes.arrayOf(
  //           PropTypes.shape({
  //             id: PropTypes.string.isRequired,
  //             displayValue: PropTypes.string.isRequired,
  //             value: PropTypes.string.isRequired
  //           })
  //         ).isRequired
  //       })
  //     ).isRequired
  //   })
  // ).isRequired
};

// ProductDescription.defaultProps = {
//   defAmount: 0
// };

export default ProductDescription;
