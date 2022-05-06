/* eslint-disable jsx-a11y/label-has-associated-control */
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
    const { type, name, value, content, nameForRadioButtons, isDefaultChecked, onChange } =
      this.props;
    return (
      <label className={styles.radioButton}>
        <input
          className={styles.input}
          type="radio"
          name={nameForRadioButtons + name}
          value={value}
          checked={isDefaultChecked}
          // eslint-disable-next-line no-shadow
          onChange={() => onChange(name, value)}
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
  onChange: PropTypes.func,
  color: PropTypes.string
};

RadioButton.defaultProps = {
  isDefaultChecked: false,
  onChange: (name, value) => console.log(name, value),
  color: '#44FF03'
};

export default RadioButton;
