
'use strict';

const React               = require('react');
const modifyCartItems     = require('../../Actions/ModifyCartItems');


//  -------------------------------- styles
const StyleCart =
  { border: '1px solid #555'
  , borderRadius: '3px'
  , margin: '20px 0'
  , padding: '10px'
  , backgroundColor: '#FAFAFA'
  };
const StyleTopRow =
  { display: 'flex'
  , justifyContent: 'space-between'
  };
const StylePizzaName =
  { fontSize: '30px'
  , fontWeight: 400
  , margin: '10px 0'
  };
const StylePizzaPrice =
  { fontSize: '20px'
  , color: '#888'
  , margin: '10px 0'
  };
const StylePizzaToppings =
  { fontSize: '22px'
  , display: 'flex'
  , alignItems: 'center'
  , flexWrap: 'wrap'
  };
const StylePizzaTopping =
  { display: 'inline-block'
  , fontWeight: 400
  , margin: '0 10px'
  };
const StyleXIcon =
  { cursor: 'pointer'
  , fontSize: '18px'
  , border: '1px solid #555'
  , borderRadius: '3px'
  , width: '22px'
  , height: '22px'
  , textAlign: 'center'
  , color: '#FAFAFA'
  , backgroundColor: '#777'
  };
const StyleTotalPriceSection =
  { display: 'flex'
  , justifyContent: 'flex-end'
  , padding: '20px 0'
  , fontSize: '20px'
  };
//  --------------------------------


const Cart = React.createClass({
  propTypes:
    { cart: React.PropTypes.object.isRequired
    , pizzaSizes: React.PropTypes.array.isRequired }
    ,

  handleRemovingItem(itemId) {
    modifyCartItems(
      { item:
          { id: itemId }
      , operation: 'REMOVE'
      }
    );
  },

  render() {
    let self      = this;
    let { cart }  = this.props;

    let makeToppingsElements = toppings => {
      if(toppings.length > 0){
        return toppings
        .map(topping => (
          <span
            key={topping}
            style={StylePizzaTopping}
          >
            {topping}
          </span>
        ));
      }
      else {
        return (
          <span style={{ margin: '0 10px', fontSize: '16px' }}>
            {'(none, still have time to select something...)'}
          </span>
        );
      }
    };

    let itemElements =
      cart
      .items
      .map((item, i) => (
        <div key={item.id}>

          {i > 0 ? <hr /> : null}

          <div style={StyleTopRow}>
            <small>
              {`${i+1}.`}
            </small>
            <span
              onClick={function() { self.handleRemovingItem(item.id); }}
              style={StyleXIcon}
            >
              {'x'}
            </span>
          </div>


          <div style={StylePizzaName}>
            {`${item.name} pizza`}
          </div>

          <div style={StylePizzaToppings}>
            <span>
              {`toppings (${item.toppingsSelected.length}) :`}
            </span>
            {makeToppingsElements(item.toppingsSelected)}
          </div>

          <div style={StylePizzaPrice}>
            {`${item.price.toFixed(2)} $`}
          </div>
        </div>
      ));

    let totalPrice =
      cart
      .items
      .reduce
        ( (prev, cur) => prev + cur.price
        , 0
        )
      .toFixed(2);

    return (
      <div style={StyleCart}>
        <h1>
          {'Cart'}
        </h1>
        {itemElements}
        <hr />
        <div style={StyleTotalPriceSection}>
          {`Total price: ${totalPrice} $`}
        </div>
      </div>
    );
  }
});


module.exports = Cart;
