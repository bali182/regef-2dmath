import { point, lineSegment } from '../src'

describe('LineSegment', () => {
  it('should compute intersection properly when LineSegments intersect in a Point', () => {
    const l1 = lineSegment(0, 0, 5, 5)
    const l2 = lineSegment(5, 0, 0, 5)
    expect(l1.intersection(l2)).toEqual(point(2.5, 2.5))
  })
  it('should return null when parallel line segments given', () => {
    const l1 = lineSegment(0, 0, 5, 0)
    const l2 = lineSegment(0, 2, 5, 2)
    expect(l1.intersection(l2)).toBe(null)
  })
  it('should return null when LineSegments do not intersect', () => {
    const l1 = lineSegment(0, 0, 5, 0)
    const l2 = lineSegment(0, 2, 5, 2)
    expect(l1.intersection(l2)).toBe(null)
  })
  it('should return null when LineSegments intersect in a LineSegment', () => {
    const l1 = lineSegment(0, 0, 5, 0)
    const l2 = lineSegment(2, 0, 3, 0)
    expect(l1.intersection(l2)).toBe(null)
  })
})
