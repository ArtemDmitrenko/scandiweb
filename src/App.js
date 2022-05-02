import React from 'react';
// import ThumbSlider from './components/ThumbSlider/ThumbSlider';
// import Card from './components/Card/Card';
// import CartBasket from './components/CartBasket/CartBasket';
import ProductsListPage from './pages/ProductsListPage/ProductsListPage';
// import Tabs from './components/Tabs/Tabs';
// import Logo from './components/Logo/Logo';
// import CurrentChanger from './components/CurrentChanger/CurrentChanger';
// import CartBasket from './components/CartBasket/CartBasket';
// import Button from './components/Button/Button';
// import Counter from './components/Counter/Counter';
// import Attribute from './components/Attribute/Attribute';
// import ProductDescription from './components/ProductDescription/ProductDescription';

import './style/style.scss';
// import BagItem from './components/BagItem/BagItem';
// import Bag from './components/Bag/Bag';
// import './App.scss';

class App extends React.Component {
  render() {
    return (
      <>
        {/* <Card
          id="id33"
          inStock
          imgSrc="https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg"
          name="Apollo Running Short"
          price="$50.00"
          handleClickOnButton={(id) => console.log(id)}
          handleClickOnProductCard={(id) => console.log(id)}
        /> */}
        {/* <Tabs />
        <Logo width={41} height={41} alt="Logo" />
        <CurrentChanger
          currencies={currencies}
          handleChangeCurrency={(symbol) => console.log(symbol)}
        />
        <CartBasket amount={3} />
        <Button isButton buttonType="button" text="view bag" type="solid" />

        {attributes.map(({ name, type, items }) => {
          return (
            <Attribute key={name} type={type} size="big" name={name} title={name} items={items} />
          );
        })}

        <Counter defAmount={5} maxAmount={10} />
        <ProductDescription size="big" product={product} /> */}

        {/* <BagItem size="small" product={product} /> */}
        {/* <Bag size="small" products={products} /> */}
        {/* <CartBasket amount={3} products={products} /> */}
        {/* <Header categories={categories} currencies={currencies} products={products} /> */}
        <ProductsListPage />

        {/* <ThumbSlider images={ImgScr} /> */}
      </>
      // <div className="App">
      //   <header className="App-header">Learn React</header>
      // </div>
    );
  }
}

export default App;
