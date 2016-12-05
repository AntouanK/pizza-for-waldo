
'use strict';

const types         = require('../Constants').Types;
const appDispatcher = require('../Store/dispatcher');

const modifyCartItems
  = ({ item, operation }) =>
    appDispatcher.dispatch
      ( { type: types.MODIFY_CART_ITEMS
        , item
        , operation
        }
      );


module.exports = modifyCartItems;
