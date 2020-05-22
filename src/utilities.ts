import type { Step } from './types'

export const getFirstStep = (steps: Step[]): Step =>
  Object.values(steps).reduce((a, b) => (!a || a.order > b.order ? b : a), null)

export const getLastStep = (steps: Step[]): Step =>
  Object.values(steps).reduce((a, b) => (!a || a.order < b.order ? b : a), null)

export const getStepNumber = (steps: Step[], step?: Step): number =>
  step &&
  Object.values(steps).filter((_step) => _step.order <= step.order).length

export const getPrevStep = (steps: Step[], step?: Step): number =>
  Object.values(steps)
    .filter((_step) => _step.order < step.order)
    .reduce((a, b) => (!a || a.order < b.order ? b : a), null)

export const getNextStep = (steps: Step[], step?: Step): number =>
  Object.values(steps)
    .filter((_step) => _step.order > step.order)
    .reduce((a, b) => (!a || a.order > b.order ? b : a), null) || step
