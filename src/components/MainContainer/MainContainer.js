/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import OverlayContext from '../../Context/OverlayContext';

import styles from './mainContainer.module.scss';

class MainContainer extends React.Component {
  render() {
    const { overlayProducts } = this.context;
    const { children } = this.props;
    return (
      <main className={styles.main}>
        {overlayProducts && <div className={styles.overlay} />}
        <div className={styles.wrapper}>{children}</div>
      </main>
    );
  }
}

MainContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired
};

MainContainer.contextType = OverlayContext;

export default MainContainer;
