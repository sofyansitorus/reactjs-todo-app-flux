import React, { Component, Fragment } from 'react';

class InputText extends Component {
  render() {
    return (
      <Fragment>
        <input type="text" {...this.props} />
      </Fragment>
    );
  }
}

export default InputText;
