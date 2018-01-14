import { point } from './factories'

function slope(segment) {
  const { x1, y1, x2, y2 } = segment
  return (y2 - y1) / (x2 - x1)
}

// https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line
function lineIntersection({ x1, y1, x2, y2 }, { x1: x3, y1: y3, x2: x4, y2: y4 }) {
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

// https://www.lucidarme.me/check-if-a-point-belongs-on-a-line-segment/
function onSegment(segment, c) {
  const a = segment.point1()
  const b = segment.point2()
  const ab = point(b.x - a.x, b.y - a.y)
  const ac = point(c.x - a.x, c.y - a.y)
  const kac = (ab.x * ac.x) + (ab.y * ab.y)
  const kab = (ab.x * ab.x) + (ab.y * ab.y)
  return kab >= 0 && kac >= 0 && kab - kac >= 0
}

export default function intersection(segment1, segment2) {
  const slope1 = slope(segment1)
  const slope2 = slope(segment2)
  // they are parallel
  if (slope1 === slope2) {
    return null
  }
  // intersect as line
  const pt = lineIntersection(segment1, segment2)
  // point is on both line segments
  if (pt !== null && onSegment(segment1, pt) && onSegment(segment2, pt)) {
    return pt
  }
  // no intersection
  return null
}
