
'use strict';

const Immutable = require('immutable');

const initialState
  = Immutable.fromJS
    ( { pizzaSizes: []
      , cart:
        { items: []
        }
      , newPizza: {}
      }
    );

module.exports = initialState;