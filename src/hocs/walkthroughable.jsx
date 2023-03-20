// @flow
import React from "react";

type Props = {
  copilot: Object,
};

const walkthroughable = (WrappedComponent) =>
  function ({ copilot, ...props }: Props) {
    return <WrappedComponent {...copilot} {...props} />;
  };

export default walkthroughable;
