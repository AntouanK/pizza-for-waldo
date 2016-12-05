
'use strict';

const React               = require('react');

//  -------------------------------- styles
const StyleCart =
  { border: '1px solid #555'
  , borderRadius: '3px'
  , margin: '20px 0'
  , padding: '10px'
  , backgroundColor: '#FAFAFA'
  };
//  --------------------------------


const Cart = React.createClass({
  propTypes:
    { cart: React.PropTypes.object.isRequired
    , pizzaSizes: React.PropTypes.array.isRequired }
    ,

  render() {

    return (
      <div style={StyleCart}>
        <h1>
          {'Cart'}
        </h1>
      </div>
    );
  }
});


module.exports = Cart;
