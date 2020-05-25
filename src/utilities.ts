import { Step, Steps, SVGMaskPathMorphParam, ValueXY, Shape } from './types'
// @ts-ignore
import { interpolate, toCircle } from 'flubber'
import memoize from 'lodash.memoize'
import clamp from 'lodash.clamp'

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

const headPath = /^M0,0H\d*\.?\d*V\d*\.?\d*H0V0Z/
const cleanPath = memoize((path: string) => path.replace(headPath, '').trim())
const getCanvasPath = memoize((path: string) => {
  const canvasPath = path.match(headPath)
  if (canvasPath) {
    return canvasPath[0]
  }
  return ''
})

const getInterpolator = (
  previousPath: string,
  nextPath: string,
  shape: Shape,
  position: ValueXY,
  size: ValueXY,
) => {
  return shape === 'circle'
    ? toCircle(
        cleanPath(previousPath),
        position.x + size.x / 2,
        position.y + size.y / 2,
        Math.max(size.x, size.y) / 2,
      )
    : interpolate(cleanPath(previousPath), cleanPath(nextPath))
}

export const svgMaskPathMorph = ({
  previousPath,
  nextPath,
  animation,
  to: { position, size, shape },
}: SVGMaskPathMorphParam) => {
  const interpolator = getInterpolator(
    previousPath,
    nextPath,
    shape!,
    position,
    size,
  )
  return `${getCanvasPath(nextPath)}${interpolator(
    clamp(animation._value, 0, 1),
  )}`
}
