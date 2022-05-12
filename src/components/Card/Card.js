import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './card.module.scss';
import basket from './images/empty-cart.svg';

class Card extends React.Component {
  setImageClasses = () => {
    const { inStock } = this.props;
    const imageClassesArr = [styles.image];
    if (!inStock) {
      imageClassesArr.push(styles.disabledImage);
    }
    return imageClassesArr.join(' ');
  };

  render() {
    const { id, name, price, currency, imgSrc, inStock, brand, handleClickOnButton } = this.props;
    return (
      <Link className={styles.card} to={`${id}`}>
        <div className={styles.imageContainer}>
          <img className={this.setImageClasses()} src={imgSrc} alt="Product" />
          {!inStock && <span className={styles.helpText}>Out of stock</span>}
          {inStock && (
            <button className={styles.button} type="button" onClick={handleClickOnButton}>
              <img src={basket} alt="Add to basket" />
            </button>
          )}
        </div>
        <p className={inStock ? styles.name : styles.disabledName}>
          {brand} <span className={inStock ? styles.name : styles.disabledName}>{name}</span>
        </p>
        <p className={inStock ? styles.price : styles.disabledPrice}>
          {currency} {price.toFixed(2)}
        </p>
      </Link>
    );
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  inStock: PropTypes.bool.isRequired,
  handleClickOnButton: PropTypes.func.isRequired
};

export default Card;
