export type JoyrideContext = {
  registerStep: (Step) => void,
  unregisterStep: (name: string) => void,
  getCurrentStep: () => Step,
}

export type Step = {
  name: string,
  order: number,
  visible: boolean,
  target: React$Element,
  wrapper: React$Element,
};
