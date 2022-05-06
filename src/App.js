import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import ThumbSlider from './components/ThumbSlider/ThumbSlider';
// import Cart from './components/Cart/Cart';
// import CartBasket from './components/CartBasket/CartBasket';
import OnlineStoreApp from './components/OnlineStoreApp/OnlineStoreApp';
// import Tabs from './components/Tabs/Tabs';
// import Logo from './components/Logo/Logo';
// import CurrentChanger from './components/CurrentChanger/CurrentChanger';
// import CartBasket from './components/CartBasket/CartBasket';
// import Button from './components/Button/Button';
// import Counter from './components/Counter/Counter';
// import Attribute from './components/Attribute/Attribute';
// import ProductDescription from './components/ProductDescription/ProductDescription';
// import Product from './components/Product/Product';
// import { OverlayProvider } from './Context/OverlayContext';

import './style/style.scss';
// import BagItem from './components/BagItem/BagItem';
// import Bag from './components/Bag/Bag';
// import './App.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/:categoryOrCart/*" element={<OnlineStoreApp />} />
          <Route path="/" element={<Navigate to="/all" />} />
          <Route path="*" element={<OnlineStoreApp />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
