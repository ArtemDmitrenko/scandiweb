import axios from 'axios';

async function fetchProduct(id) {
  try {
    const { data } = await axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query: `
        query Product($id: String!) {
          product(id: $id) {
            id, name, gallery, description, attributes {id, name, type, items {id, displayValue, value}}, prices {amount, currency {symbol}}, brand
          }
        }          
      `,
        variables: {
          id
        }
      }
    });
    return data.data.product;
  } catch (err) {
    throw new Error(`HTTP error: ${err.message}`);
  }
}

async function fetchCategories() {
  try {
    const { data } = await axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query: `
          query {
            categories {
              name
            }
          }
        `
      }
    });
    return data.data.categories;
  } catch (err) {
    throw new Error(`HTTP error: ${err.message}`);
  }
}

async function fetchCurrencies() {
  try {
    const { data } = await axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query: `
          query {
            currencies {
              label, symbol
            }
          }
        `
      }
    });
    return data.data.currencies;
  } catch (err) {
    throw new Error(`HTTP error: ${err.message}`);
  }
}

async function fetchProducts(category) {
  try {
    const { data } = await axios({
      url: 'http://localhost:4000/graphql',
      method: 'post',
      data: {
        query: `
          query Category($categoryName: String!) {
            category(input: {title: $categoryName}) {
              name, products {id, name, inStock, gallery, brand, prices {amount, currency{symbol}}}
            }
          }
      `,
        variables: {
          categoryName: category
        }
      }
    });
    return data.data.category;
  } catch (err) {
    throw new Error(`HTTP error: ${err.message}`);
  }
}

export { fetchProduct, fetchCategories, fetchProducts, fetchCurrencies };
