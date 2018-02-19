import { line, point } from './factories'

class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
  }

  intersection(other) {
    const { x1, y1, x2, y2 } = this
    const { x1: x3, y1: y3, x2: x4, y2: y4 } = line(other)
    const xNumerator = (((x1 * y2) - (y1 * x2)) * (x3 - x4)) - ((x1 - x2) * ((x3 * y4) - (y3 * x4)))
    const yNumerator = (((x1 * y2) - (y1 * x2)) * (y3 - y4)) - ((y1 - y2) * ((x3 * y4) - (y3 * x4)))
    const denominator = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4))
    if (denominator === 0) {
      return null
    }
    const x = xNumerator / denominator
    const y = yNumerator / denominator
    return point(x, y)
  }
}

export default Line
