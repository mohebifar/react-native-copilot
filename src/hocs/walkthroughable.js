// @flow
import React from 'react';

type Props = {
  copilot: Object,
};

const walkthroughable =
  WrappedComponent =>
    ({ copilot, ...props }: Props) =>
      <WrappedComponent {...copilot} {...props} />;

export default walkthroughable;
