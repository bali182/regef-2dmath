import Point from './Point'

class LineSegment {
  constructor({ x: x1, y: y1 }, { x: x2, y: y2 }) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
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
}

export default LineSegment
