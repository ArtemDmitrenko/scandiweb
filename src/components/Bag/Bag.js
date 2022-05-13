import React from 'react';
import PropTypes from 'prop-types';

import BagItem from 'components/BagItem/BagItem';
import Button from 'components/Button/Button';
import calcTotalSum from 'utils/calcTotalSum';
import calcAmountOfItems from 'utils/calcAmountOfItems';
import convertNumToWordForm from 'utils/convertNumToWordForm';

import styles from './bag.module.scss';

class Bag extends React.Component {
  handleAmountChange = (action, index) => {
    const { handleAmountChange } = this.props;
    handleAmountChange(index, action);
  };

  static setKey = (product, index) => {
    const { name, attributes } = product;
    const attributesInString = JSON.stringify(attributes);
    return `${name}${attributesInString}${index}`;
  };

  renderAmountOfItems = () => {
    const { products } = this.props;
    const amount = calcAmountOfItems(products);
    const wordInCorrectForm = convertNumToWordForm(amount, ['item', 'items']);
    return `${amount} ${wordInCorrectForm}`;
  };

  render() {
    const {
      size,
      products,
      currency,
      handleButtonViewBagClick,
      handleAttributeChange,
      handleButtonCheckoutClick
    } = this.props;
    return (
      <div className={styles.bag}>
        <p className={styles.title}>
          My Bag, <span className={styles.amountOfItems}>{this.renderAmountOfItems()}</span>
        </p>
        <ul className={styles.listOfProducts}>
          {products.map((product, index) => (
            <li className={styles.product} key={Bag.setKey(product, index)}>
              <BagItem
                index={index}
                componentLocation="bag"
                size={size}
                product={product}
                handleAmountChange={(action) => this.handleAmountChange(action, index)}
                currency={currency}
                handleAttributeChange={(name, value) => handleAttributeChange(index, name, value)}
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
  products: PropTypes.instanceOf(Array).isRequired,
  handleAmountChange: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  handleButtonViewBagClick: PropTypes.func.isRequired,
  handleButtonCheckoutClick: PropTypes.func.isRequired,
  handleAttributeChange: PropTypes.func.isRequired
};

export default Bag;
