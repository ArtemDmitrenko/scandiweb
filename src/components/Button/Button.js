import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './button.module.scss';

class Button extends React.Component {
  setButtonStyles = () => {
    const { type } = this.props;
    const classesArr = [styles.button];
    if (type === 'bordered') classesArr.push(styles.bordered);
    if (type === 'solid') classesArr.push(styles.solid);
    return classesArr.join(' ');
  };

  render() {
    const { isButton, buttonType, disabled, text, href = '/', onClick } = this.props;
    return isButton ? (
      <button
        type={buttonType === 'submit' ? 'submit' : 'button'}
        disabled={disabled}
        className={this.setButtonStyles()}
        onClick={onClick}>
        {text}
      </button>
    ) : (
      <Link
        to={href}
        type={buttonType === 'submit' ? 'submit' : 'button'}
        disabled={disabled}
        onClick={onClick}
        className={this.setButtonStyles()}>
        {text}
      </Link>
    );
  }
}

Button.propTypes = {
  isButton: PropTypes.bool.isRequired,
  buttonType: PropTypes.string,
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  disabled: false,
  href: '/',
  onClick: () => {},
  buttonType: 'button'
};

export default Button;
