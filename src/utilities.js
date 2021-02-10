// @flow

export const getFirstStep = (steps) => Object
  .values(steps)
  .reduce((a, b) => (!a || a.order > b.order ? b : a), null);

export const getLastStep = (steps) => Object
  .values(steps)
  .reduce((a, b) => (!a || a.order < b.order ? b : a), null);

export const getStepNumber = (steps, step) => step
  && Object
    .values(steps)
    .filter(_step => _step.order <= step.order).length;

export const getPrevStep = (steps, step) => Object
  .values(steps)
  .filter(_step => _step.order < step.order)
  .reduce((a, b) => (!a || a.order < b.order ? b : a), null);

export const getNextStep = (steps, step) => Object
  .values(steps)
  .filter(_step => _step.order > step.order)
  .reduce((a, b) => (!a || a.order > b.order ? b : a), null) || step;
