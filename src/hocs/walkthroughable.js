// @flow
import React from 'react';

const walkthroughable = (Target) => {
  return class WrappedComponent extends React.Component {
    render() {
      var { copilot, ...props } = this.props;

      return (<Target {...copilot} {...props} />);
    }
  }
}

export default walkthroughable;
