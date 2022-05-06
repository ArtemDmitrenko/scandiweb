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
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Product from '../Product/Product';
import ProductsList from '../ProductsList/ProductsList';
import MainContainer from '../MainContainer/MainContainer';
import Cart from '../Cart/Cart';
// import { OverlayProvider } from '../../Context/OverlayContext';
import { GET_ALL_CATEGORIES } from '../../query/categories';

// const products = [
//   {
//     name: 'Nike Air Huarache Le',
//     gallery: [
//       'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087',
//       'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087',
//       'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087',
//       'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087',
//       'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087'
//     ],
//     description: '<p>Great sneakers for everyday use!</p>',
//     attributes: [
//       {
//         id: 'Size',
//         name: 'Size',
//         type: 'text',
//         items: [
//           {
//             id: '40',
//             displayValue: '40',
//             value: '40'
//           },
//           {
//             id: '41',
//             displayValue: '41',
//             value: '41'
//           },
//           {
//             id: '42',
//             displayValue: '42',
//             value: '42'
//           },
//           {
//             id: '43',
//             displayValue: '43',
//             value: '43'
//           }
//         ]
//       }
//     ],
//     prices: [
//       {
//         amount: 144.69
//       },
//       {
//         amount: 104
//       },
//       {
//         amount: 186.65
//       },
//       {
//         amount: 15625.24
//       },
//       {
//         amount: 10941.76
//       }
//     ],
//     brand: 'Nike x Stussy'
//   },
//   {
//     name: 'PlayStation 5',
//     gallery: [
//       'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg',
//       'https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg',
//       'https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg',
//       'https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg',
//       'https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg'
//     ],
//     description:
//       '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>',
//     attributes: [
//       {
//         id: 'Color',
//         name: 'Color',
//         type: 'swatch',
//         items: [
//           {
//             id: 'Green',
//             displayValue: 'Green',
//             value: '#44FF03'
//           },
//           {
//             id: 'Cyan',
//             displayValue: 'Cyan',
//             value: '#03FFF7'
//           },
//           {
//             id: 'Blue',
//             displayValue: 'Blue',
//             value: '#030BFF'
//           },
//           {
//             id: 'Black',
//             displayValue: 'Black',
//             value: '#000000'
//           },
//           {
//             id: 'White',
//             displayValue: 'White',
//             value: '#FFFFFF'
//           }
//         ]
//       },
//       {
//         id: 'Capacity',
//         name: 'Capacity',
//         type: 'text',
//         items: [
//           {
//             id: '512G',
//             displayValue: '512G',
//             value: '512G'
//           },
//           {
//             id: '1T',
//             displayValue: '1T',
//             value: '1T'
//           }
//         ]
//       }
//     ],
//     prices: [
//       {
//         amount: 844.02
//       },
//       {
//         amount: 606.67
//       },
//       {
//         amount: 1088.79
//       },
//       {
//         amount: 91147.25
//       },
//       {
//         amount: 63826.91
//       }
//     ],
//     brand: 'Sony'
//   }
// ];

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
      currencies: []
    };
  }

  async componentDidMount() {
    const { categoryOrCart } = this.props.params;
    const categories = await this.fetchCategories();
    const activeCategory = categoryOrCart || categories[0].name;
    const productsOfCategory = await this.fetchProducts(activeCategory);
    const currencies = await this.fetchCurrencies();
    const { dispatch } = this.props;
    dispatch({
      type: 'CHANGE_CURRENCY',
      payload: currencies[0].symbol
    });
    this.setState({
      categories,
      activeCategory,
      productsOfCategory,
      currencies
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
    const productsOfCategory = await this.fetchProducts(category);
    this.setState({
      activeCategory: category,
      productsOfCategory
    });
  };

  render() {
    const { categories, productsOfCategory, activeCategory, currencies } = this.state;

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
            <Route path="/" element={<ProductsList products={productsOfCategory} />} />
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
