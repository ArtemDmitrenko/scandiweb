const calcAmountOfItems = (products) => {
  if (products.length > 0) {
    return products.reduce((prev, item) => prev + item.value, 0);
  }
  return 0;
};

export default calcAmountOfItems;
