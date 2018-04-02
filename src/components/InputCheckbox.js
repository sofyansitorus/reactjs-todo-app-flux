import React, { Component, Fragment } from 'react';

class InputCheckbox extends Component {
  render() {
    return (
      <Fragment>
        <input type="checkbox" {...this.props} />
      </Fragment>
    );
  }
}

export default InputCheckbox;
