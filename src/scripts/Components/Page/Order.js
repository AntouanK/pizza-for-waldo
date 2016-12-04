
'use strict';

const React       = require('react');
const Store       = require('../../Store');
const NewPizza    = require('../Block/NewPizza');

//  -------------------------------- styles
const StyleOrder =
  { flex: '1 0 auto'
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
    let { newPizza, pizzaSizes }
      = this.state;

    let content;

    if(pizzaSizes.length < 1){
      content = (
        <div>
          {'No pizza data given yet.'}
        </div>
      );
    }
    else {
      content = (
        <NewPizza
          newPizza={newPizza}
          pizzaSizes={pizzaSizes}
        />
      );
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
