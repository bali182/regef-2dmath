import { point, lineSegment } from './factories'

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

  // TODO check with a math guy if this is correct
  intersection(segment) {
    const other = lineSegment(segment)
    const px = this.y1 - this.y2
    const py = this.x2 - this.x1
    const pw = (this.x1 * this.y2) - (this.x2 * this.y1)

    const qx = other.y1 - other.y2
    const qy = other.x2 - other.x1
    const qw = (other.x1 * other.y2) - (other.x2 * other.y1)

    const x = (py * qw) - (qy * pw)
    const y = (qx * pw) - (px * qw)
    const w = (px * qy) - (qx * py)

    const intersectionX = x / w
    const intersectionY = y / w

    if (
      (Number.isNaN(intersectionX)) ||
      (!Number.isFinite(intersectionX) || Number.isNaN(intersectionY)) ||
      (!Number.isFinite(intersectionY))
    ) {
      return null
    }

    return point(intersectionX, intersectionY)
  }
}

export default LineSegment
