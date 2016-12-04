
'use strict';

const React = require('react');


//  -------------------------------- styles
const StyleLabel =
  { fontSize: '1.2em'
  , padding: '0 4px'
  , userSelect: 'none'
  , WebkitUserSelect: 'none'
  , cursor: 'pointer'
  };
//  --------------------------------


const CheckBox = React.createClass({
  propTypes:
    { checked: React.PropTypes.bool
    , label: React.PropTypes.string
    , onChange: React.PropTypes.func
    }
    ,

  render() {
    let checked = !!this.props.checked;

    return (
      <label>
        <span style={StyleLabel}>
          {this.props.label}
        </span>
        <input
          checked={checked}
          onChange={this.props.onChange}
          type='checkbox'
        />
      </label>
    );
  }
});


module.exports = CheckBox;
