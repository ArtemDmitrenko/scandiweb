import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import OnlineStoreApp from 'components/OnlineStoreApp/OnlineStoreApp';

import './style/style.scss';

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
