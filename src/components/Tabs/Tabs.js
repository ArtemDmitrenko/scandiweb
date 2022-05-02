import React from 'react';
import PropTypes from 'prop-types';

import styles from './tabs.module.scss';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0
    };
  }

  handleClick = (name, index) => {
    const { handleClickTab } = this.props;
    handleClickTab(name);
    this.setState({
      activeTabIndex: index
    });
  };

  render() {
    const { categories } = this.props;
    const { activeTabIndex } = this.state;
    return (
      <ul className={styles.list}>
        {categories.map(({ name }, index) => {
          return (
            <li
              className={`${styles.listItem} ${activeTabIndex === index ? styles.active : ''}`}
              key={name}>
              <button
                className={styles.button}
                type="button"
                onClick={() => this.handleClick(name, index)}>
                {name}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}

Tabs.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  categories: PropTypes.array.isRequired,
  handleClickTab: PropTypes.func.isRequired
};

export default Tabs;
