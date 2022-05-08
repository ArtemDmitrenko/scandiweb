/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { useParams, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductsList from 'components/ProductsList/ProductsList';
import Header from 'components/Header/Header';
import Product from 'components/Product/Product';
import MainContainer from 'components/MainContainer/MainContainer';
import Cart from 'components/Cart/Cart';
import { fetchCategories, fetchCurrencies, fetchProducts } from 'fetch/fetch';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class OnlineStoreApp extends React.Component {
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
        type: 'CHANGE_CURRENCY',
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

  render() {
    const { categories, productsOfCategory, activeCategory, currencies, areProductsLoading } =
      this.state;
    const { currency } = this.props;
    return (
      <>
        <Header
          categories={categories}
          activeCategory={activeCategory}
          currencies={currencies}
          activeCurrency={currency || ''}
          handleClickTab={this.handleClickTab}
        />
        <MainContainer>
          <Routes>
            <Route
              path="/"
              element={
                <ProductsList
                  products={productsOfCategory}
                  areProductsLoading={areProductsLoading}
                />
              }
            />
            <Route path=":id" element={<Product />} />
            <Route path=":id/cart" element={<Cart size="big" />} />
            <Route path="/cart" element={<Cart size="big" />} />
          </Routes>
        </MainContainer>
      </>
    );
  }
}

OnlineStoreApp.propTypes = {
  currency: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.instanceOf(Object).isRequired
};

const mapStateToProps = (store) => {
  return {
    currency: store.currencyReducer.currency
  };
};

export default connect(mapStateToProps)(withParams(OnlineStoreApp));
