import React from 'react';
import PropTypes from 'prop-types';

import Tabs from 'components/Tabs/Tabs';
import Logo from 'components/Logo/Logo';
import CartBasket from 'components/CartBasket/CartBasket';
import CurrentChanger from 'components/CurrentChanger/CurrentChanger';

import styles from './header.module.scss';

class Header extends React.Component {
  render() {
    const { categories, currencies, activeCurrency, activeCategory, handleClickTab } = this.props;
    return (
      <header className={styles.container}>
        <div className={styles.nav}>
          <Tabs
            categories={categories}
            handleClickTab={handleClickTab}
            activeCategory={activeCategory}
          />
        </div>
        <Logo width={41} height={41} alt="Logo" />
        <div className={styles.basketCurrencyContainer}>
          <div className={styles.current}>
            <CurrentChanger currencies={currencies} activeCurrency={activeCurrency} />
          </div>
          <div className={styles.basket}>
            <CartBasket />
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  categories: PropTypes.instanceOf(Array).isRequired,
  currencies: PropTypes.instanceOf(Array).isRequired,
  activeCurrency: PropTypes.string.isRequired,
  handleClickTab: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired
};

export default Header;
