import Point from './Point'

class LineSegment {
  constructor({ x: x1, y: y1 }, { x: x2, y: y2 }) {
    this.x1 = Number(x1)
    this.y1 = Number(y1)
    this.x2 = Number(x2)
    this.y2 = Number(y2)
  }

  point1() {
    return new Point({
      x: this.x1,
      y: this.y1,
    })
  }

  point2() {
    return new Point({
      x: this.x2,
      y: this.y2,
    })
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
  intersection(lineSegment) {
    const other = new LineSegment(lineSegment)
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

    return new Point({
      x: intersectionX,
      y: intersectionY,
    })
  }
}

export default LineSegment
