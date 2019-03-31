// @flow
export type Step = {
  name: string,
  order: number,
  visible: boolean,
  target: React$Element,
  wrapper: React$Element,
  overlayElement?: OverLayElement
};

export type OverLayElement = (
  position: valueXY,
  size: valueXY,
  handleNext: Function,
  handlePrevious: Function
) => React$Element;

export type CopilotContext = {
  registerStep: Step => void,
  unregisterStep: (name: string) => void,
  getCurrentStep: () => Step
};

export type valueXY = {
  x: number,
  y: number
};
