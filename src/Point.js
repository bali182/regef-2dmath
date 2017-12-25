import { point, lineSegment } from './factories'

class Point {
  constructor(x, y) {
    this.x = Number(x)
    this.y = Number(y)
  }

  translate(p) {
    const other = point(p)
    return point(
      this.x + other.x,
      this.y + other.y,
    )
  }

  lineSegmentTo(p) {
    const other = point(p)
    return lineSegment(
      this.x,
      this.y,
      other.x,
      other.y,
    )
  }

  distanceFromPoint(p) {
    const other = point(p)
    // eslint-disable-next-line no-restricted-properties
    return Math.sqrt(Math.pow((other.x - this.x, 2), 2) + Math.pow((other.y - this.y), 2))
  }
}

export default Point
