
'use strict';

const React               = require('react');
const assign              = require('object-assign');
const CheckBox            = require('../Unit/CheckBox');
const selectNewPizzaSize  = require('../../Actions/SelectNewPizzaSize');
const selectNewTopping    = require('../../Actions/SelectNewTopping');
const modifyCartItems     = require('../../Actions/ModifyCartItems');


//  -------------------------------- styles
const StyleNewPizza =
  { border: '1px solid #555'
  , borderRadius: '3px'
  , padding: '10px'
  , backgroundColor: '#FAFAFA'
  };
const StyleSectionLabel =
  { flex: '0 0 150px'
  , fontWeight: 'bold'
  , lineHeight: '2em'
  };
const StyleCheckboxesSection =
  { display: 'flex'
  , flexWrap: 'wrap'
  , lineHeight: '2em'
  };
const StyleSection =
  { display: 'flex'
  , alignItems: 'center'
  };
const StyleButton =
  { backgroundColor: 'inherit'
  , border: '1px solid #777'
  , borderRadius: '3px'
  , padding: '6px'
  , boxShadow: '0 0 2px rgba(0,0,0,0.7)'
  , cursor: 'pointer'
  };
//  --------------------------------

const calculatePrice = ({ pizza, pizzaSizes }) =>
  pizza.basePrice
  + pizzaSizes
    //  get the toppings for our size
    .filter(size => size.name === pizza.name)
    .pop()
    .toppings
    .map(toppingWrapper => toppingWrapper.topping)
    //  keep only the ones selected
    .filter(
      topping => pizza.toppingsSelected.indexOf(topping.name) > -1
    )
    // pluck the prices
    .map(topping => topping.price)
    .reduce
    ( (total, thisPrice) => total + thisPrice
    , 0
    );


const NewPizza = React.createClass({
  propTypes:
    { newPizza: React.PropTypes.shape(
        { name: React.PropTypes.string }
      )
    , pizzaSizes: React.PropTypes.array.isRequired }
    ,

  handleAddToCart() {
    let { newPizza, pizzaSizes } = this.props;
    //  add the price to not calculate it again later
    let price = calculatePrice({ pizza: newPizza, pizzaSizes });

    modifyCartItems(
      { item:
          assign
            ( {}
            , newPizza
            , { price }
            )
      , operation: 'ADD'
      }
    );
  },

  render() {
    let { newPizza, pizzaSizes } = this.props;
    let newPizzaContent = [];

    //  ------------------------------------------------  size section
    let sizeElements =
      pizzaSizes
      .map(pizzaSize =>
        <CheckBox
          checked={newPizza.name === pizzaSize.name}
          key={pizzaSize.name}
          label={`${pizzaSize.name} (${pizzaSize.basePrice}$)`}
          onChange={function() { selectNewPizzaSize(pizzaSize.name); }}
        />
      );

    let sizeSection = (
      <div
        key='sizeSection'
        style={StyleSection}
      >
        <div style={StyleSectionLabel}>
          {'Select size:'}
        </div>
        <div style={StyleCheckboxesSection}>
          {sizeElements}
        </div>
      </div>
    );

    //  add that section in the content
    newPizzaContent.push(sizeSection);
    //  ------------------------------------------------  size section /

    if(newPizza.name !== undefined){
      //  ----------------------------------------------  toppings section
      let myPizzaSize =
        pizzaSizes
        //  keep only the size we selected
        .filter(pizzaSize => pizzaSize.name === newPizza.name)
        .pop();

      let toppingsElements =
        myPizzaSize
        .toppings
        //  iterate over the toppings to make CheckBoxes
        .map(toppingWrapper => {
          let topping = toppingWrapper.topping;
          let isChecked =
            newPizza
            .toppingsSelected
            .filter(toppingName => toppingName === topping.name)
            .pop()
            !== undefined;

          //  disable the checkbox if we reached the max toppings
          //  and it's not checked already
          let isDisabled 
            =   !isChecked
            &&  myPizzaSize.maxToppings !== null
            &&  myPizzaSize.maxToppings <= newPizza.toppingsSelected.length;

          let changeHandler =
            () =>
              selectNewTopping(
                { name: topping.name
                , select: !isChecked
                }
              );
            
          return (
            <CheckBox
              checked={isChecked}
              disabled={isDisabled}
              key={topping.name}
              label={`${topping.name} (${topping.price.toFixed(2)}$)`}
              onChange={changeHandler}
            />
          );
        });

      let toppingsSection = (
        <div
          key='toppingsSection'
          style={StyleSection}
        >
          <div style={StyleSectionLabel}>
            {'Select toppings:'}
          </div>
          <div style={StyleCheckboxesSection}>
            {toppingsElements}
          </div>
        </div>
      );

      //  add a separator first
      newPizzaContent.push(<hr key='toppings-separator' />);
      newPizzaContent.push(toppingsSection);
      //  ----------------------------------------------  toppings section /

      //  ----------------------------------------------  price section
      let price = calculatePrice({ pizza: newPizza, pizzaSizes });

      let priceSection = (
        <div
          key='priceSection'
          style={StyleSection}
        >
          <div style={StyleSectionLabel}>
            {'Price:'}
          </div>
          <div style={{ fontSize: '1.4em', lineHeight: '2em' }}>
            {`${price.toFixed(2)} $`}
          </div>
        </div>
      );

      //  add a separator first
      newPizzaContent.push(<hr key='price-separator' />);
      newPizzaContent.push(priceSection);
      //  ----------------------------------------------  price section /

      //  ----------------------------------------------  add-it section
      let addItSection = (
        <div
          key='add-it-section'
          style={StyleSection}
        >
          <div style={StyleSectionLabel}>
            {'Hungry?'}
          </div>
          <div style={{ fontSize: '1.4em', lineHeight: '2em' }}>
            <button
              onClick={this.handleAddToCart}
              style={StyleButton}
            >
              {'add it to cart'}
            </button>
          </div>
        </div>
      );
      newPizzaContent.push(<hr key='add-it-separator' />);
      newPizzaContent.push(addItSection);
      //  ----------------------------------------------  add-it section /
    }

    return (
      <div style={StyleNewPizza}>
        <h1>
          {'order a new pizza'}
        </h1>
        {newPizzaContent}
      </div>
    );
  }
});


module.exports = NewPizza;
