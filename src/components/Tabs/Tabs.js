import React from 'react';
// import PropTypes from 'prop-types';
import styles from './tabs.module.scss';

class Tabs extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.setClasses();
  // }

  // setClasses() {
  //   const { inStock } = this.props;
  //   const cardClassesArr = [styles.card];
  //   const imageClassesArr = [styles.image];
  //   if (!inStock) {
  //     cardClassesArr.push(styles.disabledCard);
  //     imageClassesArr.push(styles.disabledImage);
  //   }
  //   this.cardClasses = cardClassesArr.join(' ');
  //   this.imageClasses = imageClassesArr.join(' ');
  // }

  render() {
    // const { id, name, price, imgSrc, inStock, handleClickOnButton, handleClickOnProductCard } =
    //   this.props;
    return (
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <button className={styles.button} type="button">
            Women
          </button>
        </li>
        <li className={styles.listItem}>
          <button className={styles.button} type="button">
            Men
          </button>
        </li>
        <li className={styles.listItem}>
          <button className={styles.button} type="button">
            Kids
          </button>
        </li>
      </ul>
      // <a className={this.cardClasses} href="/" onClick={() => handleClickOnProductCard(id)}>
      //   <div className={styles.imageContainer}>
      //     <img className={this.imageClasses} src={imgSrc} alt="Product" />
      //     {!inStock && <span className={styles.helpText}>Out of stock</span>}
      //     <button className={styles.button} type="button" onClick={() => handleClickOnButton(id)}>
      //       <img src={basket} alt="Add to basket" />
      //     </button>
      //   </div>
      //   <p className={inStock ? styles.name : styles.disabledName}>{name}</p>
      //   <p className={inStock ? styles.price : styles.disabledPrice}>{price}</p>
      // </a>
    );
  }
}

// Tabs.propTypes = {
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   price: PropTypes.string.isRequired,
//   imgSrc: PropTypes.string.isRequired,
//   inStock: PropTypes.bool.isRequired,
//   handleClickOnButton: PropTypes.func.isRequired,
//   handleClickOnProductCard: PropTypes.func.isRequired
// };

export default Tabs;
