// @flow
import React from 'react';

type Props = {
  joyride: Object,
};

const joyridable =
  WrappedComponent =>
    ({ joyride, ...props }: Props) =>
      <WrappedComponent {...joyride} {...props} />;

export default joyridable;
