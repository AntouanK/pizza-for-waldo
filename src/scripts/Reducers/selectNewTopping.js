
'use strict';

const assign  = require('object-assign');
const types   = require('../Constants').Types;


const reducer
  = (state, action) => {
    if(action.type === types.SELECT_NEW_TOPPING) {
      let newTopping = action.topping;
      //  check the newTopping
      if(typeof newTopping.name !== 'string'){
        throw new Error('no proper topping name given from action');
      }

      let previousNewPizza = state.get('newPizza');

      if(
        previousNewPizza
        .toppingsSelected
        .filter(topping => topping === newTopping.name)
        .length > 0
      && newTopping.select === true
      ){
        //  if the topping we want to add is already selected,
        //  do nothing
        return state;
        //  -------------------------------
      }
      else if(
        previousNewPizza
        .toppingsSelected
        .filter(topping => topping === newTopping.name)
        .length < 1
      && newTopping.select === false
      ){
        //  if the topping we want to add is already selected,
        //  do nothing
        return state;
        //  -------------------------------
      }

      let thisPizzaSize =
        state
        .get('pizzaSizes')
        .filter(pizzaSize => pizzaSize.name === previousNewPizza.name)
        .pop();

      //  TODO
      // max topppings and base price change
      let basePrice =
        thisPizzaSize
        .basePrice;

      let toppingsSelected;

      if(newTopping.select === true){
        //  we want to add the topping
        toppingsSelected =
          previousNewPizza
          .toppingsSelected
          .concat(newTopping.name);
      }
      else {
        //  we want to remove the topping
        toppingsSelected =
          previousNewPizza
          .toppingsSelected
          .filter(toppingName => toppingName !== newTopping.name);
      }

      //  make the new newPizza object
      let newPizza =
        assign
        ( {}
        , state.get('newPizza')
        , { basePrice
          , toppingsSelected
          }
        );

      let newState = state.set('newPizza', newPizza);

      return newState;
    }
    return state;
  };

module.exports = reducer;