
'use strict';

const assign  = require('object-assign');
const types   = require('../Constants').Types;


const reducer
  = (state, action) => {
    if(action.type === types.SELECT_NEW_PIZZA_SIZE) {
      let newSize   = action.size;
      if(typeof newSize !== 'string'){
        throw new Error('no proper size given from action');
      }

      if(newSize === state.get('newPizza').name){
        //  if size is the same, do nothing
        return state;
        //  -------------------------------
      }

      let pizzaSizes = state.get('pizzaSizes');

      let thisPizzaSize =
        pizzaSizes
        .filter(pizzaSize => pizzaSize.name === newSize)
        .pop();

      // max topppings and base price change
      let basePrice =
        thisPizzaSize
        .basePrice;

      //  make the new newPizza object
      let newPizza =
        assign
        ( {}
        , state.get('newPizza')
        , { name: newSize
          , basePrice
          , toppingsSelected:
              thisPizzaSize
              .toppings
              .filter(toppingWrapper => toppingWrapper.defaultSelected)
              .map(toppingWrapper => toppingWrapper.topping.name)
          }
        );

      let newState = state.set('newPizza', newPizza);

      return newState;
    }
    return state;
  };

module.exports = reducer;