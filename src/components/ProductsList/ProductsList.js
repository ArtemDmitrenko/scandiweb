import React from 'react';
// import PropTypes from 'prop-types';
// import Attribute from '../Attribute/Attribute';
import Card from '../Card/Card';
import OverlayContext from '../../Context/OverlayContext';
import styles from './productsList.module.scss';

class ProductsList extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     amount: props.defAmount
  //   };
  // }

  // increase = () => {
  //   this.setState((prevState) => ({
  //     amount: prevState.amount + 1
  //   }));
  // };

  // decrease = () => {
  //   this.setState((prevState) => ({
  //     amount: prevState.amount - 1
  //   }));
  // };
  // stylesBrand = () => {
  //   const { size } = this.props;
  //   return `${styles.brand} ${size === 'small' ? styles.brandSmall : styles.brandBig}`;
  // };

  // stylesName = () => {
  //   const { size } = this.props;
  //   return `${styles.name} ${size === 'small' ? styles.nameSmall : styles.nameBig}`;
  // };

  // stylesPrice = () => {
  //   const { size } = this.props;
  //   return `${styles.price} ${size === 'small' ? styles.priceSmall : styles.priceBig}`;
  // };

  // renderBigPrice = () => (
  //   <>
  //     <p className={styles.titlePrice}>Price:</p>
  //     <p className={this.stylesPrice()}>$50.00</p>
  //   </>
  // );

  render() {
    // const { amount } = this.state;
    // const {
    //   size,
    //   product: { brand, name, prices, attributes }
    // } = this.props;
    const { overlayProducts } = this.context;
    return (
      <main className={styles.main}>
        {overlayProducts && <div className={styles.overlay} />}
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <h1 className={styles.title}>Category name</h1>
            <ul className={styles.products}>
              <li className={styles.product}>
                <Card
                  id="id33"
                  brand="nike"
                  inStock
                  imgSrc="https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg"
                  name="Apollo Running Short"
                  price="$50.00"
                  handleClickOnButton={(id) => console.log(id)}
                  handleClickOnProductCard={(id) => console.log(id)}
                />
              </li>
              <li className={styles.product}>
                <Card
                  id="id33"
                  brand="nike"
                  inStock
                  imgSrc="https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg"
                  name="Apollo Running Short"
                  price="$50.00"
                  handleClickOnButton={(id) => console.log(id)}
                  handleClickOnProductCard={(id) => console.log(id)}
                />
              </li>
              <li className={styles.product}>
                <Card
                  id="id33"
                  brand="nike"
                  inStock
                  imgSrc="https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg"
                  name="Apollo Running Short"
                  price="$50.00"
                  handleClickOnButton={(id) => console.log(id)}
                  handleClickOnProductCard={(id) => console.log(id)}
                />
              </li>
              <li className={styles.product}>
                <Card
                  id="id33"
                  brand="nike"
                  inStock
                  imgSrc="https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg"
                  name="Apollo Running Short"
                  price="$50.00"
                  handleClickOnButton={(id) => console.log(id)}
                  handleClickOnProductCard={(id) => console.log(id)}
                />
              </li>
            </ul>
            {/* <p className={this.stylesName()}>{name}</p>
        {size === 'small' && <p className={this.stylesPrice()}>${prices[0].amount}</p>}
        <ul className={styles.attributes}>
          {attributes.map((item) => {
            return (
              <li key={item.name}>
                <Attribute
                  type={item.type}
                  size={size}
                  name={item.name}
                  title={item.name}
                  items={item.items}
                />
              </li>
            );
          })}
        </ul>
        {size === 'big' && this.renderBigPrice()} */}
          </div>
        </div>
      </main>
    );
  }
}

ProductsList.contextType = OverlayContext;

// ProductsList.propTypes = {
//   size: PropTypes.oneOf(['big', 'small']).isRequired,
// eslint-disable-next-line react/forbid-prop-types
// product: PropTypes.object.isRequired
// product: PropTypes.objectOf(
//   PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     brand: PropTypes.string.isRequired,
//     // eslint-disable-next-line react/forbid-prop-types
//     prices: PropTypes.array.isRequired,
//     attributes: PropTypes.arrayOf(
//       PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         type: PropTypes.string.isRequired,
//         items: PropTypes.arrayOf(
//           PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             displayValue: PropTypes.string.isRequired,
//             value: PropTypes.string.isRequired
//           })
//         ).isRequired
//       })
//     ).isRequired
//   })
// ).isRequired
// };

// ProductsList.defaultProps = {
//   defAmount: 0
// };

export default ProductsList;
