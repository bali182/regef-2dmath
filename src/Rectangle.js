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

  translate({ x, y }) {
    return new Rectangle({
      x: this.x + x,
      y: this.y + y,
      width: this.width,
      height: this.height,
    })
  }

  containsPoint({ x, y }) {
    return y >= this.y
      && y < this.y + this.height
      && x >= this.x
      && x < this.x + this.width
  }

  containsRectangle({ x, y, width, height }) {
    return this.x <= x
      && this.y <= y
      && this.x + this.width >= x + width
      && this.y + this.height >= y + height
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
