import { point, line, lineSegment, rectangle } from './factories'

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

  boundingRectangle() {
    const { x1, x2, y1, y2 } = this
    const x = Math.min(x1, x2)
    const y = Math.min(y1, y2)
    const width = Math.max(Math.max(x1, x2) - x, EPSILON)
    const height = Math.max(Math.max(y1, y2) - y, EPSILON)
    return rectangle(x, y, width, height)
  }

  containsPoint(pt) {
    const p = point(pt)
    if (!this.boundingRectangle().containsPoint(p)) {
      return false
    }
    if (this.isVertical()) {
      const top = Math.min(this.y1, this.y2)
      const bottom = Math.max(this.y1, this.y2)
      return Math.abs(Math.abs(p.x) - Math.abs(this.x1)) < EPSILON
        && p.y >= top && p.y <= bottom
    } else if (this.isHorizontal()) {
      const left = Math.min(this.x1, this.x2)
      const right = Math.max(this.x1, this.x2)
      return Math.abs(Math.abs(p.y) - Math.abs(this.y1)) < EPSILON
        && p.x >= left && p.x <= right
    }
    const dx = this.x2 - this.x1
    const dy = this.y2 - this.y1
    return (((p.x - this.x1) * dy) === ((p.y - this.y1) * dx))
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
