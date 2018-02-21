import { point, line, lineSegment, rectangle } from './factories'

const EPSILON = 0.01 // we are talking about pixels so this is small enough

const sign = (x) => {
  if (x === 0) {
    return 0
  }
  return x > 0 ? 1 : -1
}

class LineSegment {
  constructor(x1, y1, x2, y2) {
    this.x1 = Number(x1)
    this.y1 = Number(y1)
    this.x2 = Number(x2)
    this.y2 = Number(y2)
  }

  point1() {
    return point(this.x1, this.y1)
  }

  point2() {
    return point(this.x2, this.y2)
  }

  length() {
    const dx = this.x1 - this.x2
    const dy = this.y1 - this.y2
    return Math.sqrt((dx * dx) + (dy * dy))
  }

  isHorizontal() {
    return this.y1 === this.y2
  }

  isVertical() {
    return this.x1 === this.x2
  }

  boundingRectangle() {
    const { x1, x2, y1, y2 } = this
    const x = Math.min(x1, x2)
    const y = Math.min(y1, y2)
    const width = Math.max(x1, x2) - x
    const height = Math.max(y1, y2) - y
    return rectangle(
      width > 0 ? x : x - EPSILON,
      height > 0 ? y : y - EPSILON,
      Math.max(width, EPSILON),
      Math.max(height, EPSILON),
    )
  }

  containsPoint(pt) {
    const p = point(pt)
    if (!this.boundingRectangle().containsPoint(p)) {
      return false
    }
    const dx = this.x2 - this.x1
    const dy = this.y2 - this.y1
    const a = ((p.x - this.x1) * dy)
    const b = ((p.y - this.y1) * dx)
    return sign(a) === sign(b) && Math.abs(Math.abs(a) - Math.abs(b)) < EPSILON
  }

  intersection(s) {
    const other = lineSegment(s)
    const selfLine = line(this)
    const otherLine = line(s)
    const lineIntersection = selfLine.intersection(otherLine)
    if (lineIntersection === null) {
      return null
    }
    if (!this.containsPoint(lineIntersection) || !other.containsPoint(lineIntersection)) {
      return null
    }
    return lineIntersection
  }
}

export default LineSegment
