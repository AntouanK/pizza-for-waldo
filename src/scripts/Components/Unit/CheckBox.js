
'use strict';

const React   = require('react');
const assign  = require('object-assign');


//  -------------------------------- styles
const StyleLabel =
  { fontSize: '1.2em'
  , padding: '0 4px'
  , userSelect: 'none'
  , WebkitUserSelect: 'none'
  , cursor: 'pointer'
  , transition: 'all 0.4s ease-in-out'
  };
//  --------------------------------


const CheckBox = React.createClass({
  propTypes:
    { checked: React.PropTypes.bool
    , disabled: React.PropTypes.bool
    , label: React.PropTypes.string
    , onChange: React.PropTypes.func
    }
    ,

  render() {
    let checked = !!this.props.checked;
    let disabled = !!this.props.disabled;
    //  make the style depending on the props
    let styleLabel =
      assign
        ( {}
        , StyleLabel
        , checked ? { textDecoration: 'underline' } : null
        , { opacity: disabled ? 0.4 : 1 }
        );

    return ( 
      <label>
        <span style={styleLabel}>
          {this.props.label}
        </span>
        <input
          checked={checked}
          disabled={disabled}
          onChange={this.props.onChange}
          type='checkbox'
        />
      </label>
    );
  }
});


module.exports = CheckBox;
