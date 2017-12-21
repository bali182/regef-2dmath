import LineSegment from './LineSegment'

class Point {
  constructor({ x, y }) {
    this.x = Number(x)
    this.y = Number(y)
  }

  translate(point) {
    const other = new Point(point)
    return new Point({
      x: this.x + other.x,
      y: this.y + other.y,
    })
  }

  lineSegmentTo(point) {
    const other = new Point(point)
    return new LineSegment({
      x1: this.x,
      y1: this.y,
      x2: other.x,
      y2: other.y,
    })
  }

  distanceFromPoint(point) {
    const other = new Point(point)
    return Math.sqrt(((other.x - this.x, 2) ** 2) + ((other.y - this.y) ** 2))
  }
}

export default Point
