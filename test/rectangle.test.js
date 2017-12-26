import { point, dimension, rectangle, lineSegment } from '../src'

describe('Rectangle', () => {
  it('should return the proper location and size', () => {
    const rect = rectangle(6, 4, 2, 7)
    expect(rect.location()).toEqual(point(6, 4))
    expect(rect.size()).toEqual(dimension(2, 7))
  })
  it('should return the proper center and corner locations', () => {
    const rect = rectangle(3, 4, 8, 9)
    expect(rect.topLeft()).toEqual(point(3, 4))
    expect(rect.topRight()).toEqual(point(11, 4))
    expect(rect.bottomRight()).toEqual(point(11, 13))
    expect(rect.bottomLeft()).toEqual(point(3, 13))
    expect(rect.center()).toEqual(point(7, 8.5))
  })
  it('should return the proper top-right-bottom-left line segments for 0 sized rectangle', () => {
    const rect = rectangle(0, 0, 0, 0)
    expect(rect.top()).toEqual(lineSegment(0, 0, 0, 0))
    expect(rect.right()).toEqual(lineSegment(0, 0, 0, 0))
    expect(rect.bottom()).toEqual(lineSegment(0, 0, 0, 0))
    expect(rect.left()).toEqual(lineSegment(0, 0, 0, 0))
  })
  it('should return the proper top-right-bottom-left line segments when using integer coordinates', () => {
    const rect = rectangle(5, 5, 10, 8)
    expect(rect.top()).toEqual(lineSegment(5, 5, 15, 5))
    expect(rect.right()).toEqual(lineSegment(15, 5, 15, 13))
    expect(rect.bottom()).toEqual(lineSegment(15, 13, 5, 13))
    expect(rect.left()).toEqual(lineSegment(5, 13, 5, 5))
  })
  it('should correctly determine if a point is inside a rectangle', () => {
    const rect = rectangle(5, 5, 10, 8)
    expect(rect.containsPoint(point(6, 6))).toBe(true)
    expect(rect.containsPoint(point(6.67, 10.12))).toBe(true)
  })
})
