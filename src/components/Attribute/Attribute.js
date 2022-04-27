/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import RadioButton from '../RadioButton/RadioButton';
import styles from './attribute.module.scss';

class Attribute extends React.Component {
  render() {
    const { type, size, title, name, items } = this.props;

    return (
      <div className={styles.container}>
        <p className={size === 'big' ? styles.nameBig : styles.nameSmall}>{title}:</p>
        <ul className={styles.allAttributes}>
          {items.map((item, index) => {
            const { id, displayValue, value } = item;
            return (
              <li key={id}>
                <RadioButton
                  type={type}
                  size={size}
                  name={name}
                  value={displayValue}
                  content={value}
                  isDefaultChecked={index === 0}
                  color={value}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

Attribute.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayValue: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Attribute;
