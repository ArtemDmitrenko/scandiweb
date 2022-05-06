/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './tabs.module.scss';

class Tabs extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     activeCategory: this.props.activeCategory
  //     // activeTabIndex: 0
  //   };
  // }

  handleClick = (name) => {
    const { handleClickTab } = this.props;
    handleClickTab(name);
    // this.setState({
    //   activeTabIndex: index
    // });
  };

  render() {
    const { categories, activeCategory } = this.props;
    // const { activeTabIndex, activeCategory } = this.state;
    return (
      <nav>
        <ul className={styles.list}>
          {categories.map(({ name }) => {
            return (
              <li
                className={`${styles.listItem} ${activeCategory === name ? styles.active : ''}`}
                key={name}>
                <Link
                  to={`/${name}`}
                  // to="/"
                  className={styles.button}
                  onClick={() => this.handleClick(name)}>
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
  // eslint-disable-next-line react/forbid-prop-types
  categories: PropTypes.array.isRequired,
  handleClickTab: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired
};

export default Tabs;
