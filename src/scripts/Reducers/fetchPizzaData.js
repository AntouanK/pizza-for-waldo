
'use strict';

const Immutable = require('immutable');
const types     = require('../Constants').Types;


const reducer
  = (state, action) => {
    if(action.type === types.FETCH_PIZZA_DATA_SUCCESS) {
      let newPizzaSizes =
        Immutable.fromJS(action.data.pizzaSizes);

      let newState = state.set('pizzaSizes', newPizzaSizes);
      return newState;
    }
    return state;
  };

module.exports = reducer;