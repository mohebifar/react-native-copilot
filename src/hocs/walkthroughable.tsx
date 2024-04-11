import React, { type FunctionComponent } from "react";
import { type NativeMethods } from "react-native/types";

interface CopilotType {
  ref?: React.RefObject<NativeMethods>;
  onLayout?: () => void;
}

export function walkthroughable<P = any>(
  WrappedComponent: React.ComponentType<P>,
) {
  const Component: FunctionComponent<P> = (props: P) => {
    const { copilot, ...rest } = props as { copilot: CopilotType } & P;
    return <WrappedComponent {...copilot} {...(rest as any)} />;
  };

  Component.displayName = "Walkthroughable";

  return Component;
}
