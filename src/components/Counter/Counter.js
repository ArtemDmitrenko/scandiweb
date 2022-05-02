import React from 'react';
import PropTypes from 'prop-types';
import styles from './counter.module.scss';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: props.defAmount
    };
  }

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

  increase = () => {
    this.setState((prevState) => ({
      amount: prevState.amount + 1
    }));
  };

  decrease = () => {
    this.setState((prevState) => ({
      amount: prevState.amount - 1
    }));
  };

  render() {
    const { amount } = this.state;
    const { maxAmount } = this.props;
    return (
      <div className={this.stylesCounter()}>
        <button
          type="button"
          className={this.stylesButton()}
          onClick={this.increase}
          disabled={amount === maxAmount}>
          <div className={styles.plus} />
        </button>
        <input disabled name="amount" className={this.stylesInput()} value={amount} />
        <button
          disabled={amount === 0}
          type="button"
          className={this.stylesButton()}
          onClick={this.decrease}>
          <div className={styles.minus} />
        </button>
      </div>
    );
  }
}

Counter.propTypes = {
  size: PropTypes.oneOf(['small', 'big']).isRequired,
  defAmount: PropTypes.number,
  maxAmount: PropTypes.number.isRequired
};

Counter.defaultProps = {
  defAmount: 0
};

export default Counter;
