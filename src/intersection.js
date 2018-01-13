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
  // not sure what this means but there is no intersection
  if (denominator === 0) {
    return null
  }
  return point(xNumerator / denominator, yNumerator / denominator)
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
  if (pt !== null && segment1.containsPoint(pt) && segment2.containsPoint(pt)) {
    return pt
  }
  // no intersection
  return null
}
