
'use strict';

const Immutable = require('immutable');

const initialState
  = Immutable.fromJS
    ( { pizzaSizes: []
      , cart:
        { items: []
        }
      }
    );

module.exports = initialState;