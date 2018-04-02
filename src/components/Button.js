import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { label, ...newProps } = this.props;
    return (
      <button {...newProps}>{label || this.props.children}</button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string,
  children: PropTypes.string,
};

export default Button;
