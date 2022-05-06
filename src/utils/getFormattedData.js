const getFormattedData = (products) => {
  const keys = ['id', 'attributes', 'value'];
  const filteredArr = products.map((n) =>
    Object.fromEntries(Object.entries(n).filter((m) => keys.includes(m[0])))
  );
  const result = [];
  filteredArr.forEach((product) => {
    const obj = {};
    obj.id = product.id;
    obj.value = product.value;
    const attributesArr = [];
    product.attributes.forEach((attribute) => {
      const attributeObj = {};
      attributeObj.id = attribute.id;
      attribute.items.forEach((value) => {
        if (value.isChecked) {
          attributeObj.value = value.id;
        }
      });
      attributesArr.push(attributeObj);
    });
    obj.attributes = attributesArr;
    result.push(obj);
  });
  return result;
};

export default getFormattedData;
