import React from 'react';

const joyridable =
  WrappedComponent =>
    ({ joyride, ...props }) =>
      <WrappedComponent {...joyride} {...props} />;

export default joyridable;