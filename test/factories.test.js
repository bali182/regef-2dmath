const { point, Point, dimension, Dimension, rectangle, Rectangle, lineSegment, LineSegment } = require('../index')

describe('factories', () => {
  describe('point', () => {
    const expectPoint = (input, x, y) => {
      expect(input).toBeInstanceOf(Point)
      expect(input.x).toBe(x)
      expect(input.y).toBe(y)
    }

    it('should construct a Point from 2 coordinates', () => {
      const p = point(1, 2)
      expectPoint(p, 1, 2)
    })
    it('should construct a Point from Point-like object', () => {
      const p = point({ x: 5, y: 8 })
      expectPoint(p, 5, 8)
    })
    it('should return the Point untouched when a Point instance given', () => {
      const original = new Point(10, 3)
      const p = point(original)
      expect(p).toBe(original)
    })
    it('should throw when wrong input given', () => {
      expect(() => point()).toThrowError(TypeError)
      expect(() => point(1)).toThrowError(TypeError)
      expect(() => point('1', 2)).toThrowError(TypeError)
      expect(() => point([1, 2])).toThrowError(TypeError)
      expect(() => point({ x: 1 })).toThrowError(TypeError)
      expect(() => point({ y: 2 })).toThrowError(TypeError)
      expect(() => point({ x: 2, y: 'foo' })).toThrowError(TypeError)
    })
  })

  describe('dimension', () => {
    const expectDimension = (input, width, height) => {
      expect(input).toBeInstanceOf(Dimension)
      expect(input.width).toBe(width)
      expect(input.height).toBe(height)
    }
    it('should construct a Dimension from width and height', () => {
      const d = dimension(1, 2)
      expectDimension(d, 1, 2)
    })
    it('should construct a Dimension from Dimension-like object', () => {
      const d = dimension({ width: 5, height: 8 })
      expectDimension(d, 5, 8)
    })
    it('should return the Dimension untouched when a Dimension instance given', () => {
      const original = new Dimension(10, 3)
      const d = dimension(original)
      expect(d).toBe(original)
    })
    it('should throw when wrong input given', () => {
      expect(() => dimension()).toThrowError(TypeError)
      expect(() => dimension(1)).toThrowError(TypeError)
      expect(() => dimension('1', 2)).toThrowError(TypeError)
      expect(() => dimension([1, 2])).toThrowError(TypeError)
      expect(() => dimension({ width: 1 })).toThrowError(TypeError)
      expect(() => dimension({ height: 2 })).toThrowError(TypeError)
      expect(() => dimension({ width: 2, height: 'foo' })).toThrowError(TypeError)
    })
  })

  describe('rectangle', () => {
    const expectRect = (input, x, y, width, height) => {
      expect(input).toBeInstanceOf(Rectangle)
      expect(input.x).toBe(x)
      expect(input.y).toBe(y)
      expect(input.width).toBe(width)
      expect(input.height).toBe(height)
    }
    it('should construct a Rectangle from x, y, width and height', () => {
      const r = rectangle(1, 2, 3, 4)
      expectRect(r, 1, 2, 3, 4)
    })
    it('should construct a Rectangle from Rectangle-like object', () => {
      const r = rectangle({ x: 7, y: 10, width: 5, height: 8 })
      expectRect(r, 7, 10, 5, 8)
    })
    it('should construct a Rectangle from Point-like and a Dimension-like object', () => {
      const r = rectangle({ x: 10, y: 1 }, { width: 2, height: 5 })
      expectRect(r, 10, 1, 2, 5)
    })
    it('should construct a Rectangle from an actual Point and Dimension', () => {
      const r = rectangle(point(8, 9), dimension(1, 7))
      expectRect(r, 8, 9, 1, 7)
    })
    it('should return the Rectangle untouched when a Rectangle instance given', () => {
      const original = new Rectangle(10, 3, 7, 4)
      const r = rectangle(original)
      expect(r).toBe(original)
    })
    it('should throw when wrong input given', () => {
      expect(() => rectangle()).toThrowError(TypeError)
      expect(() => rectangle(1)).toThrowError(TypeError)
      expect(() => rectangle('1', 2)).toThrowError(TypeError)
      expect(() => rectangle([1, 2])).toThrowError(TypeError)
      expect(() => rectangle({ x: 1 })).toThrowError(TypeError)
      expect(() => rectangle({ y: 2 })).toThrowError(TypeError)
      expect(() => rectangle({ x: 2, y: 'foo' })).toThrowError(TypeError)
      expect(() => rectangle({ width: 1 })).toThrowError(TypeError)
      expect(() => rectangle({ height: 2 })).toThrowError(TypeError)
      expect(() => rectangle({ width: 2, height: 'foo' })).toThrowError(TypeError)
      expect(() => rectangle({ x: 1, y: 2, width: 2, height: 'foo' })).toThrowError(TypeError)
      expect(() => rectangle({ x: 1, y: 2 }, { width: 2, height: 'foo' })).toThrowError(TypeError)
    })
  })

  describe('lineSegment', () => {
    const expectLineSegment = (input, x1, y1, x2, y2) => {
      expect(input).toBeInstanceOf(LineSegment)
      expect(input.x1).toBe(x1)
      expect(input.y1).toBe(y1)
      expect(input.x2).toBe(x2)
      expect(input.y2).toBe(y2)
    }
    it('should construct a LineSegment from coordinates', () => {
      const ls = lineSegment(1, 2, 3, 4)
      expectLineSegment(ls, 1, 2, 3, 4)
    })
    it('should construct a LineSegment from LineSegment-like object', () => {
      const ls = lineSegment({ x1: 7, y1: 10, x2: 5, y2: 8 })
      expectLineSegment(ls, 7, 10, 5, 8)
    })
    it('should construct a LineSegment from two Point-like objects', () => {
      const ls = lineSegment({ x: 10, y: 1 }, { x: 2, y: 5 })
      expectLineSegment(ls, 10, 1, 2, 5)
    })
    it('should construct a Rectangle from an actual Point and Dimension', () => {
      const ls = lineSegment(point(8, 9), point(1, 7))
      expectLineSegment(ls, 8, 9, 1, 7)
    })
    it('should return the Rectangle untouched when a Rectangle instance given', () => {
      const original = new LineSegment(10, 3, 7, 4)
      const ls = lineSegment(original)
      expect(ls).toBe(original)
    })
    it('should throw when wrong input given', () => {
      expect(() => lineSegment()).toThrowError(TypeError)
      expect(() => lineSegment(1)).toThrowError(TypeError)
      expect(() => lineSegment('1', 2)).toThrowError(TypeError)
      expect(() => lineSegment([1, 2])).toThrowError(TypeError)
      expect(() => lineSegment({ x1: 1 })).toThrowError(TypeError)
      expect(() => lineSegment({ y1: 2 })).toThrowError(TypeError)
      expect(() => lineSegment({ x1: 2, y1: 'foo' })).toThrowError(TypeError)
      expect(() => lineSegment({ x2: 1 })).toThrowError(TypeError)
      expect(() => lineSegment({ y2: 2 })).toThrowError(TypeError)
      expect(() => lineSegment({ x2: 2, y2: 'foo' })).toThrowError(TypeError)
      expect(() => lineSegment({ x1: 1, y1: 2, x2: 2, y2: 'foo' })).toThrowError(TypeError)
      expect(() => lineSegment({ x: 1, y: 2 }, { x: 2, y: 'foo' })).toThrowError(TypeError)
    })
  })
})
