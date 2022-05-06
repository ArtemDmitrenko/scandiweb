import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '../Tabs/Tabs';
import Logo from '../Logo/Logo';
import CartBasket from '../CartBasket/CartBasket';
import CurrentChanger from '../CurrentChanger/CurrentChanger';

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
  // eslint-disable-next-line react/forbid-prop-types
  categories: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currencies: PropTypes.array.isRequired,
  activeCurrency: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  // products: PropTypes.array.isRequired,
  handleClickTab: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired
};

// Header.defaultProps = {
//   disabled: false,
//   href: '/',
//   onClick: () => {},
//   buttonType: 'button'
// };

export default Header;
