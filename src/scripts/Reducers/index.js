
'use strict';

const types = require('../Constants').Types;

const reducer
  = (state, action) => {
    if(action.type === types.FETCH_PIZZA_DATA_SUCCESS) {
      let newState = state.set('pizzaSizes', action.data.pizzaSizes);
      return newState;
    }
    return state;
  };

const reducers =
  [reducer];

module.exports = reducers;
