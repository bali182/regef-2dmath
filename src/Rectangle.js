import { point, dimension, lineSegment, rectangle } from './factories'

class Rectangle {
  constructor(x, y, width, height) {
    this.x = Number(x)
    this.y = Number(y)
    this.width = Number(width)
    this.height = Number(height)
  }

  location() {
    return point(this.x, this.y)
  }

  size() {
    return dimension(this.width, this.height)
  }

  translate(p) {
    const input = point(p)
    return rectangle(
      this.x + input.x,
      this.y + input.y,
      this.width,
      this.height,
    )
  }

  containsPoint(p) {
    const input = point(p)
    return input.y >= this.y
      && input.y < this.y + this.height
      && input.x >= this.x
      && input.x < this.x + this.width
  }

  containsRectangle(rect) {
    const input = rectangle(rect)
    return this.x <= input.x
      && this.y <= input.y
      && this.x + this.width >= input.x + input.width
      && this.y + this.height >= input.y + input.height
  }

  top() {
    return lineSegment(this.topLeft(), this.topRight())
  }

  right() {
    return lineSegment(this.topRight(), this.bottomRight())
  }

  bottom() {
    return lineSegment(this.bottomRight(), this.bottomLeft())
  }

  left() {
    return lineSegment(this.bottomLeft(), this.topLeft())
  }

  center() {
    return point(this.x + (this.width / 2), this.y + (this.height / 2))
  }

  topLeft() {
    return point(this.x, this.y)
  }

  topRight() {
    return point(this.x + this.width, this.y)
  }

  bottomLeft() {
    return point(this.x, this.y + this.height)
  }

  bottomRight() {
    return point(this.x + this.width, this.y + this.height)
  }
}

export default Rectangle
