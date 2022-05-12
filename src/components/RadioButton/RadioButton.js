import React from 'react';
import PropTypes from 'prop-types';

import styles from './radioButton.module.scss';

class RadioButton extends React.Component {
  stylesOfContent = () => {
    const { type, size } = this.props;
    if (type === 'swatch') {
      return `${size === 'big' ? styles.bigColor : styles.smallColor}`;
    }
    return `${styles.contentText} ${size === 'big' ? styles.bigText : styles.smallText}`;
  };

  inlineStyle = () => {
    const { type, color } = this.props;
    if (type === 'swatch') {
      return {
        backgroundColor: color
      };
    }
    return {};
  };

  render() {
    const {
      type,
      name,
      value,
      content,
      nameForRadioButtons,
      isDefaultChecked,
      disabled,
      onChange
    } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label className={styles.radioButton}>
        <input
          className={styles.input}
          type="radio"
          name={nameForRadioButtons + name}
          value={value}
          checked={isDefaultChecked}
          onChange={() => onChange(name, value)}
          disabled={disabled}
        />
        <div className={this.stylesOfContent()} style={this.inlineStyle()}>
          {type === 'swatch' ? '' : content}
        </div>
      </label>
    );
  }
}

RadioButton.propTypes = {
  nameForRadioButtons: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isDefaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string
};

RadioButton.defaultProps = {
  isDefaultChecked: false,
  disabled: false,
  color: '#44FF03'
};

export default RadioButton;
