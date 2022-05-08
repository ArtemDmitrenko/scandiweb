import React from 'react';
import styles from './loadingSpinner.module.scss';

class LoadingSpinner extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.spinner} />
      </div>
    );
  }
}

export default LoadingSpinner;
