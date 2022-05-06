import React from 'react';

const OverlayContext = React.createContext();

export class OverlayProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayProducts: false
    };
    console.log('neeeeew context!!!!!');
  }

  setOverlay = () => {
    this.setState((prevState) => ({
      overlayProducts: !prevState.overlayProducts
    }));
  };

  render() {
    const { overlayProducts } = this.state;
    console.log('context rendering...', overlayProducts);

    const { setOverlay } = this;
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <OverlayContext.Provider value={{ overlayProducts, setOverlay }}>
        {children}
      </OverlayContext.Provider>
    );
  }
}

export default OverlayContext;
