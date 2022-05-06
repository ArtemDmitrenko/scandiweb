import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './currentChanger.module.scss';

class CurrentChanger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false
    };
    // eslint-disable-next-line react/destructuring-assignment
    this.currencyMenuRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutOfMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutOfMenu);
  }

  handleClickOnMenu = () => {
    this.setState((prevState) => ({
      isOpened: !prevState.isOpened
    }));
  };

  handleClickOutOfMenu = (e) => {
    const { isOpened } = this.state;
    if (!this.currencyMenuRef.current.contains(e.target) && isOpened) {
      this.setState({
        isOpened: false
      });
    }
  };

  handleClickOnCurrency = (symbol) => {
    // eslint-disable-next-line react/prop-types
    const { dispatch } = this.props;
    dispatch({
      type: 'CHANGE_CURRENCY',
      payload: symbol
    });
    this.setState((prevState) => ({
      isOpened: !prevState.isOpened
    }));
  };

  stylesCheckMark = () => {
    const { isOpened } = this.state;
    return `${styles.checkMark} ${isOpened ? styles.checkMarkOpened : styles.checkMarkClosed}`;
  };

  render() {
    const { isOpened } = this.state;
    const { currencies, activeCurrency } = this.props;
    return (
      <div ref={this.currencyMenuRef} className={styles.container}>
        <button className={styles.button} type="button" onClick={this.handleClickOnMenu}>
          <p className={styles.buttonText}>{activeCurrency}</p>
          <div className={this.stylesCheckMark()} />
        </button>
        <ul className={isOpened ? styles.list : styles.hidden}>
          {currencies.map((item) => {
            const { label, symbol } = item;
            return (
              <li className={styles.item} key={symbol}>
                <button
                  className={styles.buttonSelect}
                  onClick={this.handleClickOnCurrency.bind(this, symbol)}
                  type="button">
                  {symbol} {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

CurrentChanger.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  activeCurrency: PropTypes.string.isRequired
};

const mapStateToProps = (store) => {
  return {
    currency: store.currencyReducer.currency
  };
};

export default connect(mapStateToProps)(CurrentChanger);

// export default CurrentChanger;
