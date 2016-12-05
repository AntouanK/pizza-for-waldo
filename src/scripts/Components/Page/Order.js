
'use strict';

const React       = require('react');
const Store       = require('../../Store');
const NewPizza    = require('../Block/NewPizza');
const Cart        = require('../Block/Cart');

//  -------------------------------- styles
const StyleOrder =
  { flex: '1'
  , margin: '20px'
  , minWidth: '400px'
  , maxWidth: '900px'
  };
//  --------------------------------


const Order = React.createClass({
  getInitialState()
    { return Store.getState().toJS(); }
    ,

  componentDidMount()
    { Store.addChangeListener(this._onChange); }
    ,

  componentWillUnmount()
    { Store.removeChangeListener(this._onChange); }
    ,

  /* eslint-disable react/no-set-state */
  /* only the top level components can have state ( the one of the Store ) */
  _onChange()
    { this.setState(Store.getState().toJS()); }
    ,
  /* eslint-enable react/no-set-state */

  render() {
    let { newPizza, pizzaSizes, cart }
      = this.state;
    let content = [];

    if(pizzaSizes.length < 1){
      content.push(
        <div key='no-data-yet'>
          {'No pizza data given yet.'}
        </div>
      );
    }
    else {
      let newPizzaContent = (
        <NewPizza
          key='new-pizza'
          newPizza={newPizza}
          pizzaSizes={pizzaSizes}
        />
      );

      content.push(newPizzaContent);
    }

    if(cart.items.length > 0){
      let cartContent = (
        <Cart
          cart={cart}
          key='cart'
          pizzaSizes={pizzaSizes}
        />
      );

      content.push(cartContent);
    }

    return (
      <div style={StyleOrder}>
        {'Pizzaria Don Waldo'}
        {content}
      </div>
    );
  }
});


module.exports = Order;
