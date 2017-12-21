import Point from './Point'
import Dimension from './Dimension'
import LineSegment from './LineSegment'

class Rectangle {
  constructor({ x, y, width, height }) {
    this.x = Number(x)
    this.y = Number(y)
    this.width = Number(width)
    this.height = Number(height)
  }

  location() {
    return new Point({
      x: this.x,
      y: this.y,
    })
  }

  size() {
    return new Dimension({
      width: this.width,
      height: this.height,
    })
  }

  translate(point) {
    const input = new Point(point)
    return new Rectangle({
      x: this.x + input.x,
      y: this.y + input.y,
      width: this.width,
      height: this.height,
    })
  }

  containsPoint(point) {
    const input = new Point(point)
    return input.y >= this.y
      && input.y < this.y + this.height
      && input.x >= this.x
      && input.x < this.x + this.width
  }

  containsRectangle(rect) {
    const input = new Rectangle(rect)
    return this.x <= input.x
      && this.y <= input.y
      && this.x + this.width >= input.x + input.width
      && this.y + this.height >= input.y + input.height
  }

  top() {
    return new LineSegment(
      this.topLeft(),
      this.topRight(),
    )
  }

  right() {
    return new LineSegment(
      this.topRight(),
      this.bottomRight(),
    )
  }

  bottom() {
    return new LineSegment(
      this.bottomRight(),
      this.bottomLeft(),
    )
  }

  left() {
    return new LineSegment(
      this.bottomLeft(),
      this.topLeft(),
    )
  }

  center() {
    return new Point({
      x: this.x + (this.width / 2),
      y: this.y + (this.height / 2),
    })
  }

  topLeft() {
    return new Point({
      x: this.x,
      y: this.y,
    })
  }

  topRight() {
    return new Point({
      x: this.x + this.width,
      y: this.y,
    })
  }

  bottomLeft() {
    return new Point({
      x: this.x,
      y: this.y + this.height,
    })
  }

  bottomRight() {
    return new Point({
      x: this.x + this.width,
      y: this.y + this.height,
    })
  }
}

export default Rectangle
