import { point, line } from './factories'

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

  intersects(s) {
    const self = line(this)
    const other = line(s)
    const intPoint = self.intersection(other)
    if (intPoint === null) {
      return null
    }
    if (this.isVertical()) {
      const top = Math.min(this.y1, this.y2)
      const bottom = Math.max(this.y1, this.y2)
      const onSegment = Math.abs(Math.abs(intPoint.x) - Math.abs(this.x1)) < EPSILON
        && intPoint.y >= top && intPoint.y <= bottom
      return onSegment ? intPoint : null
    } else if (this.isHorizontal()) {
      const left = Math.min(this.x1, this.x2)
      const right = Math.max(this.x1, this.x2)
      const onSegment = Math.abs(Math.abs(intPoint.y) - Math.abs(this.y1)) < EPSILON
        && intPoint.x >= left && intPoint.x <= right
      return onSegment ? intPoint : null
    }
    const dx = this.x2 - this.x1
    const dy = this.y2 - this.y1
    const onSegment = (((intPoint.x - this.x1) * dy) === ((intPoint.y - this.y1) * dx))
    return onSegment ? intPoint : null
  }
}

export default LineSegment
