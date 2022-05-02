/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import styles from './productsList.module.scss';

class ProductsList extends React.Component {
  render() {
    const { products } = this.props.products;
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{this.props.products.name}</h1>
        <ul className={styles.products}>
          {products &&
            this.props.products.products.map(({ id, brand, name, prices, inStock, gallery }) => {
              return (
                <li className={styles.product} key={id}>
                  <Card
                    id={id}
                    brand={brand}
                    inStock={inStock}
                    imgSrc={gallery[0]}
                    name={name}
                    price={prices[0].amount}
                    handleClickOnButton={(idNumber) => console.log(idNumber)}
                    handleClickOnProductCard={(idNumber) => console.log(idNumber)}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

ProductsList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.object.isRequired
};

// ProductsList.defaultProps = {
//   defAmount: 0
// };

export default ProductsList;
