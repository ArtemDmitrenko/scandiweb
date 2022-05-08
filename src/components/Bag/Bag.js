import React from 'react';
import PropTypes from 'prop-types';

import BagItem from 'components/BagItem/BagItem';
import Button from 'components/Button/Button';
import calcTotalSum from 'utils/calcTotalSum';
import calcAmountOfItems from 'utils/calcAmountOfItems';
import convertNumToWordForm from 'utils/convertNumToWordForm';

import styles from './bag.module.scss';

class Bag extends React.Component {
  renderAmountOFItems = () => {
    const { products } = this.props;
    const amount = calcAmountOfItems(products);
    const wordInCorrectForm = convertNumToWordForm(amount, ['item', 'items']);
    return `${amount} ${wordInCorrectForm}`;
  };

  // eslint-disable-next-line class-methods-use-this
  handleAttributeChange = (id, name, value) => {
    const { handleAttributeChange } = this.props;
    handleAttributeChange(id, name, value);
  };

  render() {
    const {
      size,
      products,
      handleAmountChange,
      currency,
      handleButtonViewBagClick,
      handleButtonCheckoutClick
      // handleAttributeChange
    } = this.props;
    return (
      <div className={styles.bag}>
        <p className={styles.title}>
          My Bag, <span className={styles.amountOfItems}>{this.renderAmountOFItems()}</span>
        </p>
        <ul className={styles.listOfProducts}>
          {products.map((product) => (
            <li className={styles.product} key={product.name}>
              <BagItem
                componentLocation="bag"
                size={size}
                product={product}
                handleAmountChange={handleAmountChange}
                currency={currency}
                handleAttributeChange={(name, value) =>
                  this.handleAttributeChange(product.id, name, value)
                }
              />
            </li>
          ))}
        </ul>
        <div className={styles.sum}>
          <p className={styles.totalText}>Total</p>
          <p className={styles.totalPrice}>
            {currency}
            {calcTotalSum(products, currency)}
          </p>
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            isButton={false}
            text="view bag"
            type="bordered"
            href="cart"
            onClick={handleButtonViewBagClick}
          />
          <Button
            isButton
            buttonType="submit"
            text="check out"
            type="solid"
            onClick={handleButtonCheckoutClick}
          />
        </div>
      </div>
    );
  }
}

Bag.propTypes = {
  size: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  products: PropTypes.array.isRequired,
  handleAmountChange: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  handleButtonViewBagClick: PropTypes.func.isRequired,
  handleButtonCheckoutClick: PropTypes.func.isRequired,
  handleAttributeChange: PropTypes.func.isRequired
};

// const mapStateToProps = (store) => {
//   return {
//     products: store.cartProductsReducer.products
//   };
// };

// export default connect(mapStateToProps)(Bag);

export default Bag;
