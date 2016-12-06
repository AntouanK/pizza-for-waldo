
'use strict';

const types         = require('../Constants').Types;
const appDispatcher = require('../Store/dispatcher');
//  load a mock, in case of no internet connection
const pizzaResponse = require('../../mocks/pizza-data.response.json');


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
    .catch((/*err*/) => {
      //  for the purposes of the demo, in case of an error 
      //  we'll reply with a mocked response
      appDispatcher.dispatch
        ( { type: types.FETCH_PIZZA_DATA_SUCCESS
          , data: pizzaResponse.data
          }
        );
      
      /*  normally, we would send back an error, like this:
      console.error(err);
      appDispatcher.dispatch
        ( { type: types.FETCH_PIZZA_DATA_FAILURE } );
      */
    });
  };


module.exports = fetchPizzaData;
