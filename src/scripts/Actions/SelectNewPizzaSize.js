
'use strict';

const types         = require('../Constants').Types;
const appDispatcher = require('../Store/dispatcher');

const selectNewPizzaSize
  = size =>
    appDispatcher.dispatch
      ( { type: types.SELECT_NEW_PIZZA_SIZE
        , size
        }
      );


module.exports = selectNewPizzaSize;
