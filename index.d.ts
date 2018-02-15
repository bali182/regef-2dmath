export class Point {
  public readonly x: number
  public readonly y: number
  translate(point: PointLike): Point
  lineSegmentTo(point: PointLike): Point
  distanceFromPoint(point: PointLike): Point
}

export class Rectangle {
  public readonly x: number
  public readonly y: number
  public readonly width: number
  public readonly height: number

  location(): Point
  size(): Dimension
  translate(point: PointLike): Rectangle
  containsPoint(point: PointLike): boolean
  containsRectangle(rectangle: RectangleLike): boolean
  top(): LineSegment
  right(): LineSegment
  bottom(): LineSegment
  left(): LineSegment
  center(): Point
  topLeft(): Point
  topRight(): Point
  bottomLeft(): Point
  bottomRight(): Point
}

export class Dimension {
  public readonly width: number
  public readonly height: number
}

export class LineSegment {
  public readonly x1: number
  public readonly y1: number
  public readonly x2: number
  public readonly y2: number
  point1(): Point
  point2(): Point
  length(): number
  isHorizontal(): boolean
  isVertical(): boolean
  intersection(segment: LineSegmentLike): Point
}

interface PointLike {
  x: number
  y: number
}

export function point(x: number, y: number): Point
export function point(other: PointLike): Point

interface DimensionLike {
  width: number
  height: number
}

export function dimension(width: number, height: number): Dimension
export function dimension(other: DimensionLike): Dimension

interface RectangleLike {
  x: number
  y: number
  width: number
  height: number
}

export function rectangle(x: number, y: number, width: number, height: number): Rectangle
export function rectangle(topLeft: PointLike, dimension: DimensionLike): Rectangle
export function rectangle(other: RectangleLike): Rectangle

interface LineSegmentLike {
  x1: number
  y1: number
  x2: number
  y2: number
}

export function lineSegment(x1: number, y1: number, x2: number, y2: number): LineSegment
export function lineSegment(p1: PointLike, p2: PointLike): LineSegment
export function lineSegment(other: LineSegmentLike): LineSegment