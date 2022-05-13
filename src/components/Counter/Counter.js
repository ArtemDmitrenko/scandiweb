import React from 'react';
import PropTypes from 'prop-types';

import styles from './counter.module.scss';

class Counter extends React.Component {
  stylesButton = () => {
    const { size } = this.props;
    return `${styles.button} ${size === 'small' ? styles.smallButton : styles.bigButton}`;
  };

  stylesInput = () => {
    const { size } = this.props;
    return `${styles.input} ${size === 'small' ? styles.smallInput : styles.bigInput}`;
  };

  stylesCounter = () => {
    const { size } = this.props;
    return `${styles.counter} ${size === 'small' ? styles.smallCounter : styles.bigCounter}`;
  };

  increase = (e) => {
    const { handleAmountChange } = this.props;
    handleAmountChange('increase');
    e.stopPropagation();
  };

  decrease = (e) => {
    const { handleAmountChange } = this.props;
    handleAmountChange('decrease');
    e.stopPropagation();
  };

  render() {
    const { maxAmount, defAmount } = this.props;
    return (
      <div className={this.stylesCounter()}>
        <button
          type="button"
          className={this.stylesButton()}
          onClick={(e) => this.increase(e)}
          disabled={defAmount === maxAmount}
        >
          <div className={styles.plus} />
        </button>
        <input disabled name="amount" className={this.stylesInput()} value={defAmount} />
        <button
          disabled={defAmount === 0}
          type="button"
          className={this.stylesButton()}
          onClick={(e) => this.decrease(e)}
        >
          <div className={styles.minus} />
        </button>
      </div>
    );
  }
}

Counter.propTypes = {
  size: PropTypes.oneOf(['small', 'big']).isRequired,
  defAmount: PropTypes.number,
  maxAmount: PropTypes.number.isRequired,
  handleAmountChange: PropTypes.func.isRequired
};

Counter.defaultProps = {
  defAmount: 0
};

export default Counter;
