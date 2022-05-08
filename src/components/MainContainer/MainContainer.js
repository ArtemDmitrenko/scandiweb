import React from 'react';
import PropTypes from 'prop-types';

import OverlayContext from 'Context/OverlayContext';

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
  children: PropTypes.node.isRequired
};

MainContainer.contextType = OverlayContext;

export default MainContainer;
