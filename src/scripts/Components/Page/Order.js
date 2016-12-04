
'use strict';

const React       = require('react');
const Store       = require('../../Store');
const NewPizza    = require('../Block/NewPizza');

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
    return (
      <div>
        {'Hello Waldo'}
        <NewPizza pizzaSizes={this.state.pizzaSizes} />
      </div>
    );
  }
});


module.exports = Order;
