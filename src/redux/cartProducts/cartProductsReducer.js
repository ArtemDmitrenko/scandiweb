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
      const stateCopy = JSON.parse(JSON.stringify(state.products));
      const newState = stateCopy.map((product, index) => {
        if (index === action.payload) {
          product.value += 1;
          return product;
        }
        return product;
      });
      return {
        ...state,
        products: [...newState]
      };
    }
    case DECREASE_PRODUCT_QUANTITY: {
      const stateCopy = JSON.parse(JSON.stringify(state.products));
      const newState = stateCopy.reduce((prev, product, index) => {
        if (index === action.payload) {
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
        const actionPayloadCopy = JSON.parse(JSON.stringify(action.payload));
        actionPayloadCopy.value = 1;
        return { ...state, products: [...state.products, actionPayloadCopy] };
      }
      let indexOfProductWithSameAttributes = null;
      productsCopy.forEach((product, index) => {
        if (
          JSON.stringify(product.attributes) === JSON.stringify(action.payload.attributes) &&
          product.id === action.payload.id
        ) {
          indexOfProductWithSameAttributes = index;
        }
      });
      if (indexOfProductWithSameAttributes !== null) {
        const newProducts = productsCopy.map((item, index) => {
          if (index === indexOfProductWithSameAttributes) {
            item.value += 1;
            return item;
          }
          return item;
        });
        return { ...state, products: [...newProducts] };
      }
      const actionPayloadCopy = JSON.parse(JSON.stringify(action.payload));
      actionPayloadCopy.value = 1;
      return { ...state, products: [...state.products, actionPayloadCopy] };
    }
    case SET_ATTRIBUTE: {
      const productsCopy = JSON.parse(JSON.stringify(state.products));
      const newProducts = productsCopy.map((product, index) => {
        if (index === action.payload.index) {
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
