/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-duplicates */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import React from 'react';
import axios from 'axios';
import { useParams, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import ProductsList from 'components/ProductsList/ProductsList';
import Header from 'components/Header/Header';
import Product from 'components/Product/Product';
import MainContainer from 'components/MainContainer/MainContainer';
import Cart from 'components/Cart/Cart';
import { GET_ALL_CATEGORIES } from 'query/categories';

function withParams(Component) {
  // eslint-disable-next-line prettier/prettier
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
    console.log('dfdfdfdfdfd');
    const { categoryOrCart } = this.props.params;
    const categories = await this.fetchCategories();
    const activeCategory = categoryOrCart || categories[0].name;
    const productsOfCategory = await this.fetchProducts(activeCategory);
    const currencies = await this.fetchCurrencies();
    const { dispatch, currency } = this.props;
    console.log(currency);
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

  fetchCategories = async () => {
    try {
      const { data } = await axios({
        url: 'http://localhost:4000/graphql',
        method: 'post',
        data: {
          query: GET_ALL_CATEGORIES
        }
      });
      return data.data.categories;
    } catch (err) {
      console.log(err.message);
    }
  };

  fetchCurrencies = async () => {
    try {
      const { data } = await axios({
        url: 'http://localhost:4000/graphql',
        method: 'post',
        data: {
          query: `
            query {
              currencies {
                label, symbol
              }
            }
          `
        }
      });
      return data.data.currencies;
    } catch (err) {
      console.log(err.message);
    }
  };

  fetchProducts = async (category) => {
    try {
      const { data } = await axios({
        url: 'http://localhost:4000/graphql',
        method: 'post',
        data: {
          query: `
            query Category($categoryName: String!) {
              category(input: {title: $categoryName}) {
                name, products {id, name, inStock, gallery, brand, prices {amount, currency{symbol}}}
              }
            }
        `,
          variables: {
            categoryName: category
          }
        }
      });
      return data.data.category;
    } catch (err) {
      console.log(err.message);
    }
  };

  handleClickTab = async (category) => {
    this.setState({
      areProductsLoading: true
    });
    const productsOfCategory = await this.fetchProducts(category);
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
      // <OverlayProvider>
      <>
        <Header
          categories={categories}
          activeCategory={activeCategory}
          currencies={currencies}
          activeCurrency={currency || ''}
          // products={products}
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
      // </OverlayProvider>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    currency: store.currencyReducer.currency
  };
};

// export default App;
export default connect(mapStateToProps)(withParams(OnlineStoreApp));

// export default withParams(OnlineStoreApp);
