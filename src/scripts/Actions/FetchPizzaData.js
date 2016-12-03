
'use strict';

const types         = require('../Constants').Types;
const appDispatcher = require('../Store/dispatcher');

const query
  = `
    query {
      pizzaSizes {
        name
        maxToppings
        basePrice
        toppings {
          defaultSelected
          topping {
            name
            price

          }
        }
      }
    }
    `;

const headers = new Headers();
headers.append('Content-Type', 'application/graphql');
headers.append('Accept', 'application/json');

const requestOptions =
  { method: 'POST'
  , body: query
  , headers
  };

const fetchPizzaData
  = () => {
    //  trigger the "loading" action first
    appDispatcher.dispatch
      ( { type: types.FETCH_PIZZA_DATA_LOADING } );

    fetch
      ( 'http://core-graphql.dev.waldo.photos/pizza'
      , requestOptions
      )
    .then(response => response.json())
    .then(responseBody => {
      //  we expect the query results under .data
      if(responseBody.data === undefined){
        appDispatcher.dispatch
          ( { type: types.FETCH_PIZZA_DATA_FAILURE } );
      }
      else {
        appDispatcher.dispatch
        ( { type: types.FETCH_PIZZA_DATA_SUCCESS
          , data: responseBody.data
          }
        );
      }
    })
    .catch(err => {
      console.error(err);
      appDispatcher.dispatch
        ( { type: types.FETCH_PIZZA_DATA_FAILURE } );
    });
  };


module.exports = fetchPizzaData;
