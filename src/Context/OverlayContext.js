import React from 'react';
import PropTypes from 'prop-types';

const OverlayContext = React.createContext();

export class OverlayProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayProducts: false
    };
  }

  setOverlay = () => {
    this.setState((prevState) => ({
      overlayProducts: !prevState.overlayProducts
    }));
  };

  render() {
    const { overlayProducts } = this.state;
    const { setOverlay } = this;
    const { children } = this.props;
    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <OverlayContext.Provider value={{ overlayProducts, setOverlay }}>
        {children}
      </OverlayContext.Provider>
    );
  }
}

OverlayProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default OverlayContext;
