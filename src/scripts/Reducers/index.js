
'use strict';

const Consologger   = require('consologger');
const logger        = new Consologger();

//  only for dev, add a logger middleware
const loggerMiddleware
  = (state, action) => {
    logger
    .grey((new Date()).toISOString())
    .grey(' | ')
    .blue('action')
    .print();
    console.log(action);

    return state;
  };

const reducers =
  [ loggerMiddleware
  , require('./fetchPizzaData')
  , require('./selectNewPizzaSize')
  , require('./selectNewTopping')
  , require('./modifyCartItems')
  ];

module.exports = reducers;
