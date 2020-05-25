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

export const hasTwoPath = (pathOrPaths: string | string[]) =>
  typeof pathOrPaths !== 'string' && Array.isArray(pathOrPaths)

export const getFirstPath = (pathOrPaths: string | string[]): string =>
  (!hasTwoPath(pathOrPaths) ? pathOrPaths : pathOrPaths[0]) as string

export const getSecondPath = (pathOrPaths: string | string[]) =>
  hasTwoPath(pathOrPaths) ? pathOrPaths[1] : undefined
