/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Product from '../../components/Product/Product';
import ProductsList from '../../components/ProductsList/ProductsList';
import MainContainer from '../../components/MainContainer/MainContainer';
import Cart from '../../components/Cart/Cart';
import { OverlayProvider } from '../../Context/OverlayContext';
import { GET_ALL_CATEGORIES } from '../../query/categories';

// const productsForBasket = [
//   {
//     name: 'Nike Air Huarache Le',
//     prices: [
//       {
//         currency: {
//           label: 'USD',
//           symbol: '$'
//         },
//         amount: 144.69
//       },
//       {
//         currency: {
//           label: 'GBP',
//           symbol: '£'
//         },
//         amount: 104
//       },
//       {
//         currency: {
//           label: 'AUD',
//           symbol: 'A$'
//         },
//         amount: 186.65
//       },
//       {
//         currency: {
//           label: 'JPY',
//           symbol: '¥'
//         },
//         amount: 15625.24
//       },
//       {
//         currency: {
//           label: 'RUB',
//           symbol: '₽'
//         },
//         amount: 10941.76
//       }
//     ],
//     brand: 'Nike x Stussy',
//     attributes: [
//       {
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
//     ]
//   },
//   {
//     name: 'Nike Air Huarache Le2',
//     prices: [
//       {
//         currency: {
//           label: 'USD',
//           symbol: '$'
//         },
//         amount: 144.69
//       },
//       {
//         currency: {
//           label: 'GBP',
//           symbol: '£'
//         },
//         amount: 104
//       },
//       {
//         currency: {
//           label: 'AUD',
//           symbol: 'A$'
//         },
//         amount: 186.65
//       },
//       {
//         currency: {
//           label: 'JPY',
//           symbol: '¥'
//         },
//         amount: 15625.24
//       },
//       {
//         currency: {
//           label: 'RUB',
//           symbol: '₽'
//         },
//         amount: 10941.76
//       }
//     ],
//     brand: 'Nike x Stussy22',
//     attributes: [
//       {
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
//     ]
//   }
// ];

const currencies = [
  {
    label: 'USD',
    symbol: '$'
  },
  {
    label: 'GBP',
    symbol: '£'
  },
  {
    label: 'AUD',
    symbol: 'A$'
  },
  {
    label: 'JPY',
    symbol: '¥'
  },
  {
    label: 'RUB',
    symbol: '₽'
  }
];

const product = {
  name: 'Nike Air Huarache Le',
  gallery: [
    'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087',
    'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087',
    'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087',
    'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087',
    'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087'
  ],
  description: '<p>Great sneakers for everyday use!</p>',
  attributes: [
    {
      id: 'Size',
      name: 'Size',
      type: 'text',
      items: [
        {
          id: '40',
          displayValue: '40',
          value: '40'
        },
        {
          id: '41',
          displayValue: '41',
          value: '41'
        },
        {
          id: '42',
          displayValue: '42',
          value: '42'
        },
        {
          id: '43',
          displayValue: '43',
          value: '43'
        }
      ]
    }
  ],
  prices: [
    {
      amount: 144.69
    },
    {
      amount: 104
    },
    {
      amount: 186.65
    },
    {
      amount: 15625.24
    },
    {
      amount: 10941.76
    }
  ],
  brand: 'Nike x Stussy'
};

const products = [
  {
    name: 'Nike Air Huarache Le',
    gallery: [
      'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087',
      'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087',
      'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087',
      'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087',
      'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087'
    ],
    description: '<p>Great sneakers for everyday use!</p>',
    attributes: [
      {
        id: 'Size',
        name: 'Size',
        type: 'text',
        items: [
          {
            id: '40',
            displayValue: '40',
            value: '40'
          },
          {
            id: '41',
            displayValue: '41',
            value: '41'
          },
          {
            id: '42',
            displayValue: '42',
            value: '42'
          },
          {
            id: '43',
            displayValue: '43',
            value: '43'
          }
        ]
      }
    ],
    prices: [
      {
        amount: 144.69
      },
      {
        amount: 104
      },
      {
        amount: 186.65
      },
      {
        amount: 15625.24
      },
      {
        amount: 10941.76
      }
    ],
    brand: 'Nike x Stussy'
  },
  {
    name: 'PlayStation 5',
    gallery: [
      'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg',
      'https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg'
    ],
    description:
      '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>',
    attributes: [
      {
        id: 'Color',
        name: 'Color',
        type: 'swatch',
        items: [
          {
            id: 'Green',
            displayValue: 'Green',
            value: '#44FF03'
          },
          {
            id: 'Cyan',
            displayValue: 'Cyan',
            value: '#03FFF7'
          },
          {
            id: 'Blue',
            displayValue: 'Blue',
            value: '#030BFF'
          },
          {
            id: 'Black',
            displayValue: 'Black',
            value: '#000000'
          },
          {
            id: 'White',
            displayValue: 'White',
            value: '#FFFFFF'
          }
        ]
      },
      {
        id: 'Capacity',
        name: 'Capacity',
        type: 'text',
        items: [
          {
            id: '512G',
            displayValue: '512G',
            value: '512G'
          },
          {
            id: '1T',
            displayValue: '1T',
            value: '1T'
          }
        ]
      }
    ],
    prices: [
      {
        amount: 844.02
      },
      {
        amount: 606.67
      },
      {
        amount: 1088.79
      },
      {
        amount: 91147.25
      },
      {
        amount: 63826.91
      }
    ],
    brand: 'Sony'
  }
];

class ProductsListPage extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      productsOfCategory: {}
    };
  }

  async componentDidMount() {
    const categories = await this.fetchCategories();
    const productsOfCategory = await this.fetchProducts(categories[0].name);
    this.setState({
      categories,
      productsOfCategory
    });
  }

  // async componentDidMount() {
  //   try {
  //     const [categories, products] = await axios.all([
  //       this.fetchCategories(),
  //       this.fetchProducts('tech')
  //     ]);
  //     this.setState({
  //       categories: categories.data.categories,
  //       products: products.data.category
  //     });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }

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

  handleClickTab = async (name) => {
    const productsOfCategory = await this.fetchProducts(name);
    this.setState({
      productsOfCategory
    });
  };

  render() {
    const { categories, productsOfCategory } = this.state;
    return (
      <OverlayProvider>
        <Router>
          <Header
            categories={categories}
            currencies={currencies}
            products={products}
            handleClickTab={this.handleClickTab}
          />
          <MainContainer>
            <Routes>
              <Route path="/" element={<ProductsList products={productsOfCategory} />} />
              <Route path="/product" element={<Product product={product} />} />
              <Route path="/cart" element={<Cart size="big" products={products} />} />
            </Routes>
          </MainContainer>
        </Router>
      </OverlayProvider>
    );
  }
}

export default ProductsListPage;
