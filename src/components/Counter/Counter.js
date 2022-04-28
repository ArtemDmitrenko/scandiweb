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
      <div className={styles.counter}>
        <button
          type="button"
          className={styles.button}
          onClick={this.increase}
          disabled={amount === maxAmount}>
          <div className={styles.plus} />
        </button>
        <input disabled name="amount" className={styles.input} value={amount} />
        <button
          disabled={amount === 0}
          type="button"
          className={styles.button}
          onClick={this.decrease}>
          <div className={styles.minus} />
        </button>
      </div>
    );
  }
}

Counter.propTypes = {
  defAmount: PropTypes.number,
  maxAmount: PropTypes.number.isRequired
};

Counter.defaultProps = {
  defAmount: 0
};

export default Counter;
