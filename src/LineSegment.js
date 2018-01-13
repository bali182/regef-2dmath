import { point, lineSegment } from './factories'
import intersection from './intersection'

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

  intersection(segment) {
    const other = lineSegment(segment)
    return intersection(this, other)
  }

  containsPoint(p) {
    const c = point(p)
    const a = this.point1()
    const b = this.point2()
    const ab = point(b.x - a.x, b.y - a.y)
    const ac = point(c.x - a.x, c.y - a.y)
    const kac = (ab.x * ac.x) + (ab.y * ab.y)
    const kab = (ab.x * ab.x) + (ab.y * ab.y)
    return kab >= 0 && kac >= 0 && kab - kac >= 0
  }
}

export default LineSegment
