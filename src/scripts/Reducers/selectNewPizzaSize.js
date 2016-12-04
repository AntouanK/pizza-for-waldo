
'use strict';

const types = require('../Constants').Types;

const reducer
  = (state, action) => {
    if(action.type === types.SELECT_NEW_PIZZA_SIZE) {
      let pizzaSizes = state.get('pizzaSizes');
      let newPizza = state.get('newPizza');
      //  set the new size ( and it's also the name )
      newPizza.size = action.size;
      newPizza.name = action.size;
      // max topppings and base price change as well
      newPizza.basePrice =
        pizzaSizes
        .filter(pizzaSize => pizzaSize.name === newPizza.name)
        .pop()
        .basePrice;

      let newState = state.set('newPizza', newPizza);
      return newState;
    }
    return state;
  };

module.exports = reducer;