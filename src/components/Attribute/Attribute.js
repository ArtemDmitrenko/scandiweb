/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import RadioButton from 'components/RadioButton/RadioButton';

import styles from './attribute.module.scss';

class Attribute extends React.Component {
  // eslint-disable-next-line class-methods-use-this

  render() {
    const { type, size, nameForRadioButtons, title, name, items, handleAttributeChange } =
      this.props;

    return (
      <div className={styles.container}>
        <p className={size === 'big' ? styles.nameBig : styles.nameSmall}>{title}:</p>
        <ul className={styles.allAttributes}>
          {items.map((item) => {
            console.log(item.isChecked);

            const { id, displayValue, value } = item;
            return (
              <li key={id} className={`${size === 'big' ? styles.itemBig : styles.itemSmall}`}>
                <RadioButton
                  nameForRadioButtons={nameForRadioButtons}
                  type={type}
                  size={size}
                  name={name}
                  value={displayValue}
                  content={value}
                  isDefaultChecked={item.isChecked}
                  color={value}
                  onChange={handleAttributeChange}
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
  nameForRadioButtons: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  handleAttributeChange: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayValue: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Attribute;
