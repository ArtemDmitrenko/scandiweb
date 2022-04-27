import React from 'react';
import PropTypes from 'prop-types';
import styles from './bagItem.module.scss';

class BagItem extends React.Component {
  render() {
    // const { isButton, buttonType, disabled, text, type, href = '/', onClick } = this.props;

    // const classesArr = [styles.button];

    // if (type === 'bordered') classesArr.push(styles.bordered);
    // if (type === 'solid') classesArr.push(styles.solid);

    // const classes = classesArr.join(' ');

    return (
      <div className={styles.item}>
        <div className={styles.descriptionContainer}>
          <div className={styles.description}>
            <div className={styles.name}>Apollo Running Short</div>
            <div className={styles.price}>$50.00</div>
          </div>
          <ul>
            <li>
              <p>Size</p>
              <div>
                <ul>
                  <li>XS</li>
                  <li>S</li>
                  <li>M</li>
                  <li>L</li>
                </ul>
              </div>
            </li>
          </ul>
          <div className={styles.counter}></div>
        </div>
        <div className={styles.imageContainer}></div>
      </div>
    );
  }
}

BagItem.propTypes = {
  isButton: PropTypes.bool.isRequired,
  buttonType: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.bool.isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default BagItem;
