/* eslint-disable no-param-reassign */
import {
  ADD_PRODUCT,
  INCREASE_PRODUCT_QUANTITY,
  DECREASE_PRODUCT_QUANTITY,
  SET_ATTRIBUTE
} from './cartProductsActions';

const defaultState = {
  products: []
};

// eslint-disable-next-line default-param-last
const cartProductsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INCREASE_PRODUCT_QUANTITY: {
      const stateCopy = state.products.map((value) => ({ ...value }));
      return {
        ...state,
        // eslint-disable-next-line no-return-assign
        products: stateCopy.map((product) =>
          product.id === action.payload
            ? {
                ...product,
                value: (product.value += 1)
              }
            : product
        )
      };
    }
    case DECREASE_PRODUCT_QUANTITY: {
      const stateCopy = JSON.parse(JSON.stringify(state.products));
      const newState = stateCopy.reduce((prev, product) => {
        if (product.id === action.payload) {
          if (product.value !== 1) {
            product.value -= 1;
            prev.push(product);
            return prev;
          }
          return prev;
        }
        prev.push(product);
        return prev;
      }, []);
      return {
        ...state,
        products: [...newState]
      };
    }
    case ADD_PRODUCT: {
      const productsCopy = JSON.parse(JSON.stringify(state.products));
      const isProductInState =
        productsCopy.filter((item) => item.id === action.payload.id).length > 0;
      if (!isProductInState) {
        action.payload.value = 1;
        return { ...state, products: [...state.products, action.payload] };
      }
      const newProducts = productsCopy.map((item) => {
        if (item.id === action.payload.id) {
          item.value += 1;
          return item;
        }
        return item;
      });
      return { ...state, products: [...newProducts] };
    }
    case SET_ATTRIBUTE: {
      const productsCopy = JSON.parse(JSON.stringify(state.products));
      const newProducts = productsCopy.map((product) => {
        if (product.id === action.payload.idProduct) {
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
      return {
        ...state,
        products: [...newProducts]
      };
    }
    default:
      return state;
  }
};

export default cartProductsReducer;
