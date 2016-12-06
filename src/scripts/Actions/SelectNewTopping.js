
'use strict';

const types         = require('../Constants').Types;
const appDispatcher = require('../Store/dispatcher');

const selectNewTopping
  = topping =>
    appDispatcher.dispatch
      ( { type: types.SELECT_NEW_TOPPING
        , topping //  String
        }
      );


module.exports = selectNewTopping;
