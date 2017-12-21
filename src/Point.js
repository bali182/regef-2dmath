import LineSegment from './LineSegment'

class Point {
  constructor({ x, y }) {
    this.x = Number(x)
    this.y = Number(y)
  }

  translate({ x, y }) {
    return new Point({
      x: this.x + Number(x),
      y: this.y + Number(y),
    })
  }

  lineSegmentTo({ x, y }) {
    return new LineSegment({
      x1: this.x,
      y1: this.y,
      x2: Number(x),
      y2: Number(y),
    })
  }

  distanceFromPoint({ x, y }) {
    return Math.sqrt(((Number(x) - this.x, 2) ** 2) + ((Number(y) - this.y) ** 2))
  }
}

export default Point
