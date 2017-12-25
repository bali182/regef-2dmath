import { point, Point, dimension, Dimension } from '../src'

describe('factories', () => {
  describe('Point', () => {
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

  describe('Dimension', () => {
    const expectDimension = (input, width, height) => {
      expect(input).toBeInstanceOf(Dimension)
      expect(input.width).toBe(width)
      expect(input.height).toBe(height)
    }
    it('should construct a Dimension from width and height', () => {
      const p = dimension(1, 2)
      expectDimension(p, 1, 2)
    })
    it('should construct a Dimension from Dimension-like object', () => {
      const p = dimension({ width: 5, height: 8 })
      expectDimension(p, 5, 8)
    })
    it('should return the Dimension untouched when a Point instance given', () => {
      const original = new Dimension(10, 3)
      const p = dimension(original)
      expect(p).toBe(original)
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
})
