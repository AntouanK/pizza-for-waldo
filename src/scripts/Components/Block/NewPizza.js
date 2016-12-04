
'use strict';

const React               = require('react');
const CheckBox            = require('../Unit/CheckBox');
const selectNewPizzaSize  = require('../../Actions/SelectNewPizzaSize');
const selectNewTopping    = require('../../Actions/SelectNewTopping');

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
//  --------------------------------


const NewPizza = React.createClass({
  propTypes:
    { newPizza: React.PropTypes.shape(
        { name: React.PropTypes.string }
      )
    , pizzaSizes: React.PropTypes.array.isRequired }
    ,

  render() {
    let { newPizza, pizzaSizes } = this.props;
    let newPizzaContent = [];

    let sizeElements =
      pizzaSizes
      .map(pizzaSize =>
        <CheckBox
          checked={newPizza.name === pizzaSize.name}
          key={pizzaSize.name}
          label={pizzaSize.name}
          onChange={function() { selectNewPizzaSize(pizzaSize.name); }}
        />
      );

    let sizeSection = (
      <div
        key='sizeSection'
        style={{ display: 'flex' }}
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

    if(newPizza.name !== undefined){
      let toppingsElements =
        pizzaSizes
        //  keep only the size we selected
        .filter(pizzaSize => pizzaSize.name === newPizza.name)
        //  pluck the .toppings
        .map(pizzaSize => pizzaSize.toppings)
        //  pop the Array
        .pop()
        //  iterate over the toppings to make CheckBoxes
        .map(toppingWrapper => {
          let topping = toppingWrapper.topping;
          let isChecked =
            newPizza
            .toppingsSelected
            .filter(toppingName => toppingName === topping.name)
            .pop()
            !== undefined;
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
              key={topping.name}
              label={`${topping.name}  ${topping.price.toFixed(2)}$`}
              onChange={changeHandler}
            />
          );
        });

      let toppingsSection = (
        <div
          key='toppingsSection'
          style={{ display: 'flex' }}
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
