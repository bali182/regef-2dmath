import Dimension from './Dimension'
import Point from './Point'
import Rectangle from './Rectangle'
import LineSegment from './LineSegment'
import Line from './Line'

export function isNumeric(input) {
  return Number(input) === input
}

export function isPointLike(input) {
  if (input instanceof Point) {
    return true
  }
  if (!(input instanceof Object)) {
    return false
  }
  const { x, y } = input
  return isNumeric(x) && isNumeric(y)
}

export function isDimensionLike(input) {
  if (input instanceof Dimension) {
    return true
  }
  if (!(input instanceof Object)) {
    return false
  }
  const { width, height } = input
  return isNumeric(width) && isNumeric(height)
}

export function isRectangleLike(input) {
  if (input instanceof Rectangle) {
    return true
  }
  if (!(input instanceof Object)) {
    return false
  }
  const { x, y, width, height } = input
  return isNumeric(x) && isNumeric(y) && isNumeric(width) && isNumeric(height)
}

export function isLineSegmentLike(input) {
  if (input instanceof LineSegment) {
    return true
  }
  if (!(input instanceof Object)) {
    return false
  }
  const { x1, y1, x2, y2 } = input
  return isNumeric(x1) && isNumeric(y1) && isNumeric(x2) && isNumeric(y2)
}

export function isLineLike(input) {
  if (input instanceof Line) {
    return true
  }
  if (!(input instanceof Object)) {
    return false
  }
  const { x1, y1, x2, y2 } = input
  return isNumeric(x1) && isNumeric(y1) && isNumeric(x2) && isNumeric(y2)
}
