import Dimension from './Dimension'
import Point from './Point'
import Rectangle from './Rectangle'
import LineSegment from './LineSegment'

import { isDimensionLike, isPointLike, isRectangleLike, isLineSegmentLike, isNumeric } from './utils'

export function dimension(...args) {
  if (args.length === 1 && args[0] instanceof Dimension) {
    return args[0]
  } if (args.length === 2 && args.every(isNumeric)) {
    const [width, height] = args
    return new Dimension(width, height)
  } else if (args.length === 1 && isDimensionLike(args[0])) {
    const [{ width, height }] = args
    return new Dimension(width, height)
  }
  throw new TypeError(`Can't construct a Dimension from: ${args}!`)
}

export function point(...args) {
  if (args.length === 1 && args[0] instanceof Point) {
    return args[0]
  } else if (args.length === 2 && args.every(isNumeric)) {
    const [x, y] = args
    return new Point(x, y)
  } else if (args.length === 1 && isPointLike(args[0])) {
    const [{ x, y }] = args
    return new Point(x, y)
  }
  throw new TypeError(`Can't construct a Point from: ${args}!`)
}

export function rectangle(...args) {
  if (args.length === 1 && args[0] instanceof Rectangle) {
    return args[0]
  } else if (args.length === 4 && args.every(isNumeric)) {
    const [x, y, width, height] = args
    return new Rectangle(x, y, width, height)
  } else if (args.length === 1 && isRectangleLike(args[0])) {
    const [{ x, y, width, height }] = args
    return new Rectangle(x, y, width, height)
  } else if (args.length === 2 && isPointLike(args[0]) && isDimensionLike(args[1])) {
    const [{ x, y }, { width, height }] = args
    return new Rectangle(x, y, width, height)
  }
  throw new TypeError(`Can't construct a Rectangle from: ${args}!`)
}

export function lineSegment(...args) {
  if (args.length === 1 && args[0] instanceof LineSegment) {
    return args[0]
  } else if (args.length === 4 && args.every(isNumeric)) {
    const [x1, y1, x2, y2] = args
    return new LineSegment(x1, y1, x2, y2)
  } else if (args.length === 1 && isLineSegmentLike(args[0])) {
    const [{ x1, y1, x2, y2 }] = args
    return new LineSegment(x1, y1, x2, y2)
  } else if (args.length === 2 && args.every(isPointLike)) {
    const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = args
    return new LineSegment(x1, y1, x2, y2)
  }
  throw new TypeError(`Can't construct a LineSegment from: ${args}!`)
}
