import React from 'react';
import PropTypes from 'prop-types';
import styles from './currentChanger.module.scss';

class CurrentChanger extends React.Component {
  constructor(props) {
    super(props);
    const { currencies } = this.props;
    this.state = {
      isOpened: false,
      currentCurrency: currencies[0].symbol
    };
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

  handleClickOnCurrency = (symbol, callback) => {
    this.setState((prevState) => ({
      isOpened: !prevState.isOpened,
      currentCurrency: symbol
    }));
    callback(symbol);
  };

  stylesCheckMark = () => {
    const { isOpened } = this.state;
    return `${styles.checkMark} ${isOpened ? styles.checkMarkOpened : styles.checkMarkClosed}`;
  };

  render() {
    const { isOpened, currentCurrency } = this.state;
    const { currencies, handleChangeCurrency } = this.props;
    return (
      <div ref={this.currencyMenuRef} className={styles.container}>
        <button className={styles.button} type="button" onClick={this.handleClickOnMenu}>
          <p className={styles.buttonText}>{currentCurrency}</p>
          <div className={this.stylesCheckMark()} />
        </button>
        <ul className={isOpened ? styles.list : styles.hidden}>
          {currencies.map((item) => {
            const { label, symbol } = item;
            return (
              <li className={styles.item} key={symbol}>
                <button
                  className={styles.buttonSelect}
                  onClick={this.handleClickOnCurrency.bind(this, symbol, handleChangeCurrency)}
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
  handleChangeCurrency: PropTypes.func.isRequired
};

export default CurrentChanger;
