import CHANGE_CURRENCY from './currencyActions';

const defaultState = {
  currency: ''
};

// eslint-disable-next-line default-param-last
const currencyReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY:
      return { ...state, currency: action.payload };
    default:
      return state;
  }
};

export default currencyReducer;
