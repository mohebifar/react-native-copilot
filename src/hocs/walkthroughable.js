// @flow
import React from 'react';

const walkthroughable = () => {
  return class WrappedComponent extends React.Component {
    render() {
      var { copilot, ...props } = this.props;

      return (<WrappedComponent {...copilot} {...props} />);
    }
  }
}

export default walkthroughable;
