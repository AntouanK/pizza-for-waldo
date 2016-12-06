
'use strict';

const assign        = require('object-assign');
const Consologger   = require('consologger');
const EventEmitter  = require('events').EventEmitter;
const appDispatcher = require('./dispatcher');
const initialState  = require('./initialState');
const reducers      = require('../Reducers');
const CHANGE_EVENT  = 'CHANGE_EVENT';
const logger        = new Consologger();


const actionHandler
  = function(action) {

      let newState =
        reducers
        .reduce
          ( (prevState, reducer) => reducer(prevState, action)
          , this.state
          );

      if(this.state !== newState){
        this.state = newState;
        //  state changed, so emit change
        this.emitChange();
      }

      return true;
    };

const Store =
  assign
    ( {}
    , EventEmitter.prototype
    , { state: initialState
      , getState() { return this.state; }
      , emitChange() { this.emit(CHANGE_EVENT); }
      , addChangeListener(cb) { this.on(CHANGE_EVENT, cb); }
      , removeChangeListener(cb) { this.removeListener(CHANGE_EVENT, cb); }
      }
    );

//  connect the actions coming from the dispatcher with the Store
appDispatcher.register(actionHandler.bind(Store));

//  on dev, add a logger for every action
Store.addChangeListener
  (() => {
    logger
    .grey((new Date()).toISOString())
    .grey(' | ')
    .blue('state')
    .print();

    console.log(Store.getState().toJS());
  });

module.exports = Store;