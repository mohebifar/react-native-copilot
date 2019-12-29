// @flow
import type { Step } from './types';

export const getFirstStep = (steps: Array<Step>): Step => Object
  .values(steps)
  .reduce((a, b) => (!a || a.order > b.order ? b : a), null);

export const getLastStep = (steps: Array<Step>): Step => Object
  .values(steps)
  .reduce((a, b) => (!a || a.order < b.order ? b : a), null);

export const getStepNumber = (steps: Array<Step>, step: ?Step): number => step
  && Object
    .values(steps)
    .filter(_step => _step.order <= step.order).length;

export const getPrevStep = (steps: Array<Step>, step: ?Step): number => Object
  .values(steps)
  .filter(_step => _step.order < step.order)
  .reduce((a, b) => (!a || a.order < b.order ? b : a), null);

export const getNextStep = (steps: Array<Step>, step: ?Step): number => Object
  .values(steps)
  .filter(_step => _step.order > step.order)
  .reduce((a, b) => (!a || a.order > b.order ? b : a), null) || step;

export const isValidEventOnOverlay = (eventOnOverlay: string) => (eventOnOverlay === 'next' || eventOnOverlay === 'previous' || eventOnOverlay === 'stop');

export const getEventOnOverlay = (eventOnOverlay: string, props: Object) => {
  const {
    handleNext, handlePrev, handleStop, isFirstStep, isLastStep,
  } = props;
  switch (eventOnOverlay) {
    case 'next':
      return isLastStep ? handleStop : handleNext;
    case 'previous':
      return isFirstStep ? null : handlePrev;
    case 'stop':
      return handleStop;
    default:
      return null;
  }
};
