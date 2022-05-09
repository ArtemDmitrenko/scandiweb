import React from 'react';
import { BrowserRouter as Router, useParams, Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductsList from 'components/ProductsList/ProductsList';
import Header from 'components/Header/Header';
import Product from 'components/Product/Product';
import MainContainer from 'components/MainContainer/MainContainer';
import Cart from 'components/Cart/Cart';
import { fetchCategories, fetchCurrencies, fetchProducts } from 'api/fetch';
import CHANGE_CURRENCY from 'redux/currency/currencyActions';

import './style/style.scss';

function withParams(Component) {
  return function wrapper(props) {
    return <Component {...props} params={useParams()} />;
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      activeCategory: '',
      productsOfCategory: {},
      currencies: [],
      areProductsLoading: true
    };
  }

  async componentDidMount() {
    const {
      params: { categoryOrCart }
    } = this.props;
    const categories = await fetchCategories();
    const activeCategory = categoryOrCart || categories[0].name;
    const productsOfCategory = await fetchProducts(activeCategory);
    const currencies = await fetchCurrencies();
    const { dispatch, currency } = this.props;
    if (currency === '') {
      dispatch({
        type: CHANGE_CURRENCY,
        payload: currencies[0].symbol
      });
    }
    this.setState({
      categories,
      activeCategory,
      productsOfCategory,
      currencies,
      areProductsLoading: false
    });
  }

  handleClickTab = async (category) => {
    this.setState({
      areProductsLoading: true
    });
    const productsOfCategory = await fetchProducts(category);
    this.setState({
      activeCategory: category,
      productsOfCategory,
      areProductsLoading: false
    });
  };

  setToPath = () => {
    const { activeCategory } = this.state;
    return `/${activeCategory}`;
  };

  render() {
    const { categories, productsOfCategory, activeCategory, currencies, areProductsLoading } =
      this.state;
    const { currency } = this.props;
    return (
      <Router>
        <Header
          categories={categories}
          activeCategory={activeCategory}
          currencies={currencies}
          activeCurrency={currency || ''}
          handleClickTab={this.handleClickTab}
        />
        <MainContainer>
          <Routes>
            <Route path="/" element={<Navigate to={this.setToPath()} />} />
            <Route
              path="/:categoryOrCart"
              element={
                <ProductsList
                  products={productsOfCategory}
                  areProductsLoading={areProductsLoading}
                />
              }
            />
            <Route path="/cart" element={<Cart size="big" />} />
            <Route path=":categoryOrCart/:id" element={<Product />} />
          </Routes>
        </MainContainer>
      </Router>
    );
  }
}

App.propTypes = {
  currency: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.instanceOf(Object).isRequired
};

const mapStateToProps = (store) => {
  return {
    currency: store.currencyReducer.currency
  };
};

export default connect(mapStateToProps)(withParams(App));
