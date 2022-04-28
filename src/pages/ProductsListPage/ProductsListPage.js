import React from 'react';
import Header from '../../components/Header/Header';
import ProductsList from '../../components/ProductsList/ProductsList';
import { OverlayProvider } from '../../Context/OverlayContext';
// import styles from './productsListPage.module.scss';

const products = [
  {
    name: 'Nike Air Huarache Le',
    prices: [
      {
        currency: {
          label: 'USD',
          symbol: '$'
        },
        amount: 144.69
      },
      {
        currency: {
          label: 'GBP',
          symbol: '£'
        },
        amount: 104
      },
      {
        currency: {
          label: 'AUD',
          symbol: 'A$'
        },
        amount: 186.65
      },
      {
        currency: {
          label: 'JPY',
          symbol: '¥'
        },
        amount: 15625.24
      },
      {
        currency: {
          label: 'RUB',
          symbol: '₽'
        },
        amount: 10941.76
      }
    ],
    brand: 'Nike x Stussy',
    attributes: [
      {
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
    ]
  },
  {
    name: 'Nike Air Huarache Le2',
    prices: [
      {
        currency: {
          label: 'USD',
          symbol: '$'
        },
        amount: 144.69
      },
      {
        currency: {
          label: 'GBP',
          symbol: '£'
        },
        amount: 104
      },
      {
        currency: {
          label: 'AUD',
          symbol: 'A$'
        },
        amount: 186.65
      },
      {
        currency: {
          label: 'JPY',
          symbol: '¥'
        },
        amount: 15625.24
      },
      {
        currency: {
          label: 'RUB',
          symbol: '₽'
        },
        amount: 10941.76
      }
    ],
    brand: 'Nike x Stussy22',
    attributes: [
      {
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
    ]
  }
];

const categories = ['women', 'men', 'kids'];

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

class ProductsListPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isOverlay: false
  //   };
  // }

  render() {
    // const { isOverlay } = this.state;
    // const { amount } = this.state;
    // const {
    //   size,
    //   product: { brand, name, prices, attributes }
    // } = this.props;

    return (
      <OverlayProvider>
        <Header categories={categories} currencies={currencies} products={products} />
        <ProductsList />
      </OverlayProvider>
    );
  }
}

// ProductsList.propTypes = {
//   size: PropTypes.oneOf(['big', 'small']).isRequired,
// eslint-disable-next-line react/forbid-prop-types
// product: PropTypes.object.isRequired
// product: PropTypes.objectOf(
//   PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     brand: PropTypes.string.isRequired,
//     // eslint-disable-next-line react/forbid-prop-types
//     prices: PropTypes.array.isRequired,
//     attributes: PropTypes.arrayOf(
//       PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         type: PropTypes.string.isRequired,
//         items: PropTypes.arrayOf(
//           PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             displayValue: PropTypes.string.isRequired,
//             value: PropTypes.string.isRequired
//           })
//         ).isRequired
//       })
//     ).isRequired
//   })
// ).isRequired
// };

// ProductsList.defaultProps = {
//   defAmount: 0
// };

export default ProductsListPage;
