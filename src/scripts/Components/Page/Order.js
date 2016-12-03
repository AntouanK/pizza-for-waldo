
'use strict';

const React       = require('react');
const Immutable   = require('immutable');
const Store       = require('../../Store');

const Order = React.createClass({

  componentDidMount() { Store.addChangeListener(this._onChange); },

  componentWillUnmount() { Store.removeChangeListener(this._onChange); },

  /* eslint-disable react/no-set-state */
  /* only the top level components can have state ( the one of the Store ) */
  _onChange() { this.setState(Store.getState().toJS()); },
  /* eslint-enable react/no-set-state */

  render() {

    console.log('<Order> state');
    console.log(this.state);
    Immutable;

    return (
      <div>
        {'Hello Waldo'}
      </div>
    );
  }
});


module.exports = Order;
