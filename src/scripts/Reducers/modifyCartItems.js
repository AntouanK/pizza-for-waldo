
'use strict';

const Immutable = require('immutable');
const types     = require('../Constants').Types;


const reducer
  = (state, action) => {
    if(action.type === types.MODIFY_CART_ITEMS) {
      let { item, operation } = action;

      //  check the operation
      if(['ADD', 'REMOVE'].indexOf(operation) < 0){
        throw new Error('invalid operation from action');
      }

      if(operation === 'ADD'){
        // check the item
        let itemIsValid
          = item !== null
          && typeof item === 'object'
          && typeof item.name === 'string'
          && Array.isArray(item.toppingsSelected);

        if(!itemIsValid){
          throw new Error('item is not valid');
        }

        //  make up a dummy random id for the pizza to add
        item.id = '' + Date.now() + Math.random();

        let existingItems = state.getIn(['cart', 'items']).toJS();
        let newItems =
          Immutable.fromJS
            ( existingItems.concat(item)
            );
        let newState = state.setIn(['cart', 'items'], newItems);

        return newState;
      }
      else if(operation === 'REMOVE'){
        // check the item
        let itemIsValid
          = item !== null
          && typeof item === 'object'
          && typeof item.id === 'string';
        let idToRemove = item.id;

        if(!itemIsValid){
          throw new Error('item is not valid');
        }

        let existingItems = state.getIn(['cart', 'items']).toJS();
        let newItems =
          Immutable.fromJS
            ( existingItems
              .filter(thisItem => thisItem.id !== idToRemove)
            );

        let newState = state.setIn(['cart', 'items'], newItems);

        return newState;
      }
      else {
        console.log('unknown operation!');
      }
    }
    //  if nothing happened, return original state
    return state;
  };

module.exports = reducer;