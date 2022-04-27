import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.scss';

class Button extends React.Component {
  render() {
    const { isButton, buttonType, disabled, text, type, href = '/', onClick } = this.props;

    const classesArr = [styles.button];

    if (type === 'bordered') classesArr.push(styles.bordered);
    if (type === 'solid') classesArr.push(styles.solid);
    // if (type === 'directed') classesArr.push(styles.directed);
    // if (size === 'big') classesArr.push(styles.big);
    // if (size === 'small') classesArr.push(styles.small);

    const classes = classesArr.join(' ');

    return isButton ? (
      <button
        type={buttonType === 'submit' ? 'submit' : 'button'}
        disabled={disabled}
        className={classes}
        onClick={onClick}>
        {text}
      </button>
    ) : (
      <a
        href={href}
        type={buttonType === 'submit' ? 'submit' : 'button'}
        disabled={disabled}
        onClick={onClick}
        className={classes}>
        {text}
      </a>
    );
  }
}

Button.propTypes = {
  isButton: PropTypes.bool.isRequired,
  buttonType: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  disabled: false,
  href: '/',
  onClick: () => {}
};

export default Button;
