
'use strict';

const React     = require('react');
const CheckBox  = require('../Unit/CheckBox');
const selectNewPizzaSize = require('../../Actions/SelectNewPizzaSize');

const NewPizza = React.createClass({
  propTypes:
    { pizzaSizes: React.PropTypes.array.isRequired }
    ,

  render() {
    let pizzaSizes    = this.props.pizzaSizes;
    let sizeElements  =
      pizzaSizes
      .map(pizzaSize =>
        <CheckBox
          key={pizzaSize.name}
          label={pizzaSize.name}
          onChange={function() { selectNewPizzaSize(pizzaSize.name); }}
        />
      );

    return (
      <div>
        {'New Pizza | Select size'}
        {sizeElements}
      </div>
    );
  }
});


module.exports = NewPizza;
