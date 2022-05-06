const calcTotalSum = (products, currency) => {
  return currency && products
    ? products
        .reduce((sum, item) => {
          return (
            sum +
            item.prices.filter((price) => price.currency.symbol === currency)[0].amount * item.value
          );
        }, 0)
        .toFixed(2)
    : 0;
};

export default calcTotalSum;
