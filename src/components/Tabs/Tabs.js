import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './tabs.module.scss';

class Tabs extends React.Component {
  handleClick = (name) => {
    const { handleClickTab } = this.props;
    handleClickTab(name);
  };

  render() {
    const { categories, activeCategory } = this.props;
    return (
      <nav>
        <ul className={styles.list}>
          {categories.map(({ name }) => {
            return (
              <li
                className={`${styles.listItem} ${activeCategory === name ? styles.active : ''}`}
                key={name}
              >
                <Link
                  to={`/${name}`}
                  className={styles.button}
                  onClick={() => this.handleClick(name)}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

Tabs.propTypes = {
  categories: PropTypes.instanceOf(Array).isRequired,
  handleClickTab: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired
};

export default Tabs;
