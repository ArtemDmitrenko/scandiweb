import React from 'react';
import PropTypes from 'prop-types';
import logo from './img/logo.svg';
import styles from './logo.module.scss';

class Logo extends React.Component {
  render() {
    const { width, height, alt } = this.props;
    return (
      <a href="/" tabIndex={0} className={styles.link}>
        <img src={logo} width={width} height={height} className={styles.img} alt={alt} />
      </a>
    );
  }
}

Logo.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired
};

export default Logo;
