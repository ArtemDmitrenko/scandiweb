import React from 'react';
import Card from './components/Card/Card';
import Tabs from './components/Tabs/Tabs';
import Logo from './components/Logo/Logo';
import CurrentChanger from './components/CurrentChanger/CurrentChanger';
import CartBasket from './components/CartBasket/CartBasket';
import Button from './components/Button/Button';

import './style/style.scss';
import Attribute from './components/Attribute/Attribute';
// import './App.scss';

const currencies = [
  {
    label: 'USD',
    symbol: '$'
  },
  {
    label: 'GBP',
    symbol: '£'
  },
  {
    label: 'AUD',
    symbol: 'A$'
  },
  {
    label: 'JPY',
    symbol: '¥'
  },
  {
    label: 'RUB',
    symbol: '₽'
  }
];

const attributes = [
  {
    name: 'Color',
    type: 'swatch',
    items: [
      {
        id: 'Green',
        displayValue: 'Green',
        value: '#44FF03'
      },
      {
        id: 'Cyan',
        displayValue: 'Cyan',
        value: '#03FFF7'
      },
      {
        id: 'Blue',
        displayValue: 'Blue',
        value: '#030BFF'
      },
      {
        id: 'Black',
        displayValue: 'Black',
        value: '#000000'
      },
      {
        id: 'White',
        displayValue: 'White',
        value: '#FFFFFF'
      }
    ]
  },
  {
    name: 'Capacity',
    type: 'text',
    items: [
      {
        id: '512G',
        displayValue: '512G',
        value: '512G'
      },
      {
        id: '1T',
        displayValue: '1T',
        value: '1T'
      }
    ]
  }
];

class App extends React.Component {
  render() {
    return (
      <>
        <Card
          id="id33"
          inStock
          imgSrc="https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg"
          name="Apollo Running Short"
          price="$50.00"
          handleClickOnButton={(id) => console.log(id)}
          handleClickOnProductCard={(id) => console.log(id)}
        />
        <Tabs />
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
      </>
      // <div className="App">
      //   <header className="App-header">Learn React</header>
      // </div>
    );
  }
}

export default App;
