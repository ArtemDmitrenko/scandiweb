const setPriceInCurrency = (priceArr, currency) => {
  return priceArr.find((item) => item.currency.symbol === currency).amount;
};

export default setPriceInCurrency;
