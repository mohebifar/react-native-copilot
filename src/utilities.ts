import { Step, Steps } from './types'

export const getFirstStep = (steps: Steps): Step | null =>
  steps &&
  Object.values(steps).reduce(
    (a: Step | null, b) => (!a || a.order > b.order ? b : a),
    null,
  )

export const getLastStep = (steps: Steps): Step | null =>
  steps &&
  Object.values(steps).reduce(
    (a: Step | null, b) => (!a || a.order < b.order ? b : a),
    null,
  )

export const getStepNumber = (steps: Steps, step?: Step): number | undefined =>
  step &&
  Object.values(steps).filter((_step) => _step.order <= step.order).length

export const getPrevStep = (steps: Steps, step?: Step): Step | null =>
  Object.values(steps)
    .filter((_step) => _step.order < step!.order)
    .reduce((a: Step | null, b) => (!a || a.order < b.order ? b : a), null)

export const getNextStep = (
  steps: Steps,
  step?: Step,
): Step | null | undefined =>
  Object.values(steps)
    .filter((_step) => _step.order > step!.order)
    .reduce((a: Step | null, b) => (!a || a.order > b.order ? b : a), null) ||
  step
