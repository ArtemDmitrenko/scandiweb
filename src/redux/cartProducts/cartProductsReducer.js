/* eslint-disable no-param-reassign */
import { ADD_PRODUCT, REMOVE_PRODUCT, SET_ATTRIBUTE } from './cartProductsActions';

// const defaultState = {
//   products: [
//     {
//       idProduct: '',
//       amount: 0,
//       attributes: [
//         {
//           idAttribute: '',
//           idCurrentValue: ''
//         }
//       ]
//     }
//   ]
// };

const defaultState = {
  products: []
};

// eslint-disable-next-line default-param-last
const cartProductsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      // eslint-disable-next-line no-case-declarations
      const { products } = state;
      const isProductInState = products.filter((item) => item.id === action.payload.id).length > 0;
      if (products.length === 0 || !isProductInState) {
        // eslint-disable-next-line no-param-reassign
        action.payload.value = 1;
        return { ...state, products: [...state.products, action.payload] };
      }
      const newState = products.map((item) => {
        if (item.id === action.payload.id) {
          // eslint-disable-next-line no-param-reassign
          item.value += 1;
          return item;
        }
        return item;
      });
      return { ...state, products: [...newState] };
    }
    case REMOVE_PRODUCT: {
      // eslint-disable-next-line no-case-declarations
      const { products } = state;
      const newState = products.map((item) => {
        if (item.id === action.payload.id) {
          // eslint-disable-next-line no-param-reassign
          item.value -= 1;
          return item;
        }
        return item;
      });
      const filteredArr = newState.filter((item) => item.value !== 0);
      return { ...state, products: [...filteredArr] };
    }
    case SET_ATTRIBUTE: {
      const { products } = state;
      const newState = products.map((product) => {
        if (product.id === action.payload.id) {
          product.attributes.map((attribute) => {
            if (attribute.name === action.payload.name) {
              attribute.items.map((value) => {
                if (value.displayValue === action.payload.value) {
                  value.isChecked = true;
                } else if (value.isChecked) {
                  delete value.isChecked;
                }
                return value;
              });
            }
            return attribute;
          });
        }
        return product;
      });
      console.log(newState);
      return { ...state, products: [...newState] };
    }
    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
};

export default cartProductsReducer;
