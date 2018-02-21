import { point, line, lineSegment } from './factories'

// stolen from sindresorhus/number-epsilon
const EPSILON = 'EPSILON' in Number ? Number.EPSILON : 2.220446049250313e-16

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

  containsPoint(pt) {
    const intPoint = point(pt)
    if (this.isVertical()) {
      const top = Math.min(this.y1, this.y2)
      const bottom = Math.max(this.y1, this.y2)
      return Math.abs(Math.abs(intPoint.x) - Math.abs(this.x1)) < EPSILON
        && intPoint.y >= top && intPoint.y <= bottom
    } else if (this.isHorizontal()) {
      const left = Math.min(this.x1, this.x2)
      const right = Math.max(this.x1, this.x2)
      return Math.abs(Math.abs(intPoint.y) - Math.abs(this.y1)) < EPSILON
        && intPoint.x >= left && intPoint.x <= right
    }
    const dx = this.x2 - this.x1
    const dy = this.y2 - this.y1
    return (((intPoint.x - this.x1) * dy) === ((intPoint.y - this.y1) * dx))
  }

  intersects(s) {
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
