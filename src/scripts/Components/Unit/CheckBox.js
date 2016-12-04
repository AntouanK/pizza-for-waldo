
'use strict';

const React = require('react');

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
        {this.props.label}
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
