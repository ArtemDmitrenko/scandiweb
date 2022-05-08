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
      const stateCopy = state.products.map((value) => ({ ...value }));
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
      const productsCopy = state.products.map((value) => ({ ...value }));
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
      console.log(action.payload);

      const productsCopy = state.products.map((value) => ({ ...value }));
      const indexOfChangedProduct = productsCopy.indexOf(
        (item) => item.id === action.payload.idProduct
      );
      const changedProduct = productsCopy.find((item) => item.id === action.payload.idProduct);

      console.log(productsCopy);
      // const newProducts = productsCopy.map((product) => {
      //   if (product.id === action.payload.idProduct) {
      //     product.attributes.map((attribute) => {
      //       if (attribute.name === action.payload.name) {
      //         attribute.items.map((value) => {
      //           if (value.displayValue === action.payload.value) {
      //             value.isChecked = true;
      //           } else if (value.isChecked) {
      //             delete value.isChecked;
      //           }
      //           return value;
      //         });
      //       }
      //       return attribute;
      //     });
      //   }
      //   return product;
      // });
      return {
        ...state,
        // eslint-disable-next-line no-return-assign
        products: [...productsCopy]
      };
    }

    // const newState = productsCopy.map((product) => {
    //   if (product.id === action.payload.id) {
    //     product.attributes.map((attribute) => {
    //       if (attribute.name === action.payload.name) {
    //         attribute.items.map((value) => {
    //           if (value.displayValue === action.payload.value) {
    //             value.isChecked = true;
    //           } else if (value.isChecked) {
    //             delete value.isChecked;
    //           }
    //           return value;
    //         });
    //       }
    //       return attribute;
    //     });
    //   }
    //   return product;
    // });
    // return { ...state, products: [...newState] };
    // }
    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
};

export default cartProductsReducer;
