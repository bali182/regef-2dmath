'use strict';

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, '__esModule', {
  value: true
});

var Dimension = function Dimension(width, height) {
  _classCallCheck(this, Dimension);

  this.width = Number(width);
  this.height = Number(height);
};

var Rectangle =
/*#__PURE__*/
function () {
  function Rectangle(x, y, width, height) {
    _classCallCheck(this, Rectangle);

    this.x = Number(x);
    this.y = Number(y);
    this.width = Number(width);
    this.height = Number(height);
  }

  _createClass(Rectangle, [{
    key: "location",
    value: function location() {
      return point(this.x, this.y);
    }
  }, {
    key: "size",
    value: function size() {
      return dimension(this.width, this.height);
    }
  }, {
    key: "translate",
    value: function translate(p) {
      var input = point(p);
      return rectangle(this.x + input.x, this.y + input.y, this.width, this.height);
    }
  }, {
    key: "containsPoint",
    value: function containsPoint(p) {
      var input = point(p);
      return input.y >= this.y && input.y <= this.y + this.height && input.x >= this.x && input.x <= this.x + this.width;
    }
  }, {
    key: "containsRectangle",
    value: function containsRectangle(rect) {
      var input = rectangle(rect);
      return this.x <= input.x && this.y <= input.y && this.x + this.width >= input.x + input.width && this.y + this.height >= input.y + input.height;
    }
  }, {
    key: "intersection",
    value: function intersection(rect) {
      var input = rectangle(rect);
      var leftX = Math.max(this.x, input.x);
      var rightX = Math.min(this.x + this.width, input.x + input.width);
      var topY = Math.max(this.y, input.y);
      var bottomY = Math.min(this.y + this.height, input.y + input.height);

      if (leftX < rightX && topY < bottomY) {
        return rectangle(leftX, topY, rightX - leftX, bottomY - topY);
      }

      return null;
    }
  }, {
    key: "top",
    value: function top() {
      return lineSegment(this.topLeft(), this.topRight());
    }
  }, {
    key: "right",
    value: function right() {
      return lineSegment(this.topRight(), this.bottomRight());
    }
  }, {
    key: "bottom",
    value: function bottom() {
      return lineSegment(this.bottomRight(), this.bottomLeft());
    }
  }, {
    key: "left",
    value: function left() {
      return lineSegment(this.bottomLeft(), this.topLeft());
    }
  }, {
    key: "center",
    value: function center() {
      return point(this.x + this.width / 2, this.y + this.height / 2);
    }
  }, {
    key: "topLeft",
    value: function topLeft() {
      return point(this.x, this.y);
    }
  }, {
    key: "topRight",
    value: function topRight() {
      return point(this.x + this.width, this.y);
    }
  }, {
    key: "bottomLeft",
    value: function bottomLeft() {
      return point(this.x, this.y + this.height);
    }
  }, {
    key: "bottomRight",
    value: function bottomRight() {
      return point(this.x + this.width, this.y + this.height);
    }
  }]);

  return Rectangle;
}();

var EPSILON = 0.01; // we are talking about pixels so this is small enough

var sign = function sign(x) {
  if (x === 0) {
    return 0;
  }

  return x > 0 ? 1 : -1;
};

var LineSegment =
/*#__PURE__*/
function () {
  function LineSegment(x1, y1, x2, y2) {
    _classCallCheck(this, LineSegment);

    this.x1 = Number(x1);
    this.y1 = Number(y1);
    this.x2 = Number(x2);
    this.y2 = Number(y2);
  }

  _createClass(LineSegment, [{
    key: "point1",
    value: function point1() {
      return point(this.x1, this.y1);
    }
  }, {
    key: "point2",
    value: function point2() {
      return point(this.x2, this.y2);
    }
  }, {
    key: "length",
    value: function length() {
      var dx = this.x1 - this.x2;
      var dy = this.y1 - this.y2;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }, {
    key: "isHorizontal",
    value: function isHorizontal() {
      return this.y1 === this.y2;
    }
  }, {
    key: "isVertical",
    value: function isVertical() {
      return this.x1 === this.x2;
    }
  }, {
    key: "boundingRectangle",
    value: function boundingRectangle() {
      var x1 = this.x1,
          x2 = this.x2,
          y1 = this.y1,
          y2 = this.y2;
      var x = Math.min(x1, x2);
      var y = Math.min(y1, y2);
      var width = Math.max(x1, x2) - x;
      var height = Math.max(y1, y2) - y;
      return rectangle(width > 0 ? x : x - EPSILON, height > 0 ? y : y - EPSILON, Math.max(width, EPSILON), Math.max(height, EPSILON));
    }
  }, {
    key: "containsPoint",
    value: function containsPoint(pt) {
      var p = point(pt);

      if (!this.boundingRectangle().containsPoint(p)) {
        return false;
      }

      var dx = this.x2 - this.x1;
      var dy = this.y2 - this.y1;
      var a = (p.x - this.x1) * dy;
      var b = (p.y - this.y1) * dx;
      return sign(a) === sign(b) && Math.abs(Math.abs(a) - Math.abs(b)) < EPSILON;
    }
  }, {
    key: "intersection",
    value: function intersection(s) {
      var other = lineSegment(s);
      var selfLine = line(this);
      var otherLine = line(s);
      var lineIntersection = selfLine.intersection(otherLine);

      if (lineIntersection === null) {
        return null;
      }

      if (!this.containsPoint(lineIntersection) || !other.containsPoint(lineIntersection)) {
        return null;
      }

      return lineIntersection;
    }
  }]);

  return LineSegment;
}();

var Line =
/*#__PURE__*/
function () {
  function Line(x1, y1, x2, y2) {
    _classCallCheck(this, Line);

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  _createClass(Line, [{
    key: "intersection",
    value: function intersection(other) {
      var x1 = this.x1,
          y1 = this.y1,
          x2 = this.x2,
          y2 = this.y2;

      var _line = line(other),
          x3 = _line.x1,
          y3 = _line.y1,
          x4 = _line.x2,
          y4 = _line.y2;

      var xNumerator = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
      var yNumerator = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);
      var denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

      if (denominator === 0) {
        return null;
      }

      var x = xNumerator / denominator;
      var y = yNumerator / denominator;
      return point(x, y);
    }
  }]);

  return Line;
}();

function isNumeric(input) {
  return Number(input) === input;
}

function isPointLike(input) {
  if (input instanceof Point) {
    return true;
  }

  if (!(input instanceof Object)) {
    return false;
  }

  var x = input.x,
      y = input.y;
  return isNumeric(x) && isNumeric(y);
}

function isDimensionLike(input) {
  if (input instanceof Dimension) {
    return true;
  }

  if (!(input instanceof Object)) {
    return false;
  }

  var width = input.width,
      height = input.height;
  return isNumeric(width) && isNumeric(height);
}

function isRectangleLike(input) {
  if (input instanceof Rectangle) {
    return true;
  }

  if (!(input instanceof Object)) {
    return false;
  }

  var x = input.x,
      y = input.y,
      width = input.width,
      height = input.height;
  return isNumeric(x) && isNumeric(y) && isNumeric(width) && isNumeric(height);
}

function isLineSegmentLike(input) {
  if (input instanceof LineSegment) {
    return true;
  }

  if (!(input instanceof Object)) {
    return false;
  }

  var x1 = input.x1,
      y1 = input.y1,
      x2 = input.x2,
      y2 = input.y2;
  return isNumeric(x1) && isNumeric(y1) && isNumeric(x2) && isNumeric(y2);
}

function isLineLike(input) {
  if (input instanceof Line) {
    return true;
  }

  if (!(input instanceof Object)) {
    return false;
  }

  var x1 = input.x1,
      y1 = input.y1,
      x2 = input.x2,
      y2 = input.y2;
  return isNumeric(x1) && isNumeric(y1) && isNumeric(x2) && isNumeric(y2);
}
/** @return {Dimension} */


function dimension() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 1 && args[0] instanceof Dimension) {
    return args[0];
  }

  if (args.length === 2 && args.every(isNumeric)) {
    var width = args[0],
        height = args[1];
    return new Dimension(width, height);
  } else if (args.length === 1 && isDimensionLike(args[0])) {
    var _args$ = args[0],
        _width = _args$.width,
        _height = _args$.height;
    return new Dimension(_width, _height);
  }

  throw new TypeError(`Can't construct a Dimension from: ${args}!`);
}
/** @return {Point} */


function point() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  if (args.length === 1 && args[0] instanceof Point) {
    return args[0];
  } else if (args.length === 2 && args.every(isNumeric)) {
    var x = args[0],
        y = args[1];
    return new Point(x, y);
  } else if (args.length === 1 && isPointLike(args[0])) {
    var _args$2 = args[0],
        _x = _args$2.x,
        _y = _args$2.y;
    return new Point(_x, _y);
  }

  throw new TypeError(`Can't construct a Point from: ${args}!`);
}
/** @return {Rectangle} */


function rectangle() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  if (args.length === 1 && args[0] instanceof Rectangle) {
    return args[0];
  } else if (args.length === 4 && args.every(isNumeric)) {
    var x = args[0],
        y = args[1],
        width = args[2],
        height = args[3];
    return new Rectangle(x, y, width, height);
  } else if (args.length === 1 && isRectangleLike(args[0])) {
    var _args$3 = args[0],
        _x2 = _args$3.x,
        _y2 = _args$3.y,
        _width2 = _args$3.width,
        _height2 = _args$3.height;
    return new Rectangle(_x2, _y2, _width2, _height2);
  } else if (args.length === 2 && isPointLike(args[0]) && isDimensionLike(args[1])) {
    var _args$4 = args[0],
        _x3 = _args$4.x,
        _y3 = _args$4.y,
        _args$5 = args[1],
        _width3 = _args$5.width,
        _height3 = _args$5.height;
    return new Rectangle(_x3, _y3, _width3, _height3);
  }

  throw new TypeError(`Can't construct a Rectangle from: ${args}!`);
}
/** @return {LineSegment} */


function lineSegment() {
  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  if (args.length === 1 && args[0] instanceof LineSegment) {
    return args[0];
  } else if (args.length === 4 && args.every(isNumeric)) {
    var x1 = args[0],
        y1 = args[1],
        x2 = args[2],
        y2 = args[3];
    return new LineSegment(x1, y1, x2, y2);
  } else if (args.length === 1 && isLineSegmentLike(args[0])) {
    var _args$6 = args[0],
        _x4 = _args$6.x1,
        _y4 = _args$6.y1,
        _x5 = _args$6.x2,
        _y5 = _args$6.y2;
    return new LineSegment(_x4, _y4, _x5, _y5);
  } else if (args.length === 2 && args.every(isPointLike)) {
    var _args$7 = args[0],
        _x6 = _args$7.x,
        _y6 = _args$7.y,
        _args$8 = args[1],
        _x7 = _args$8.x,
        _y7 = _args$8.y;
    return new LineSegment(_x6, _y6, _x7, _y7);
  }

  throw new TypeError(`Can't construct a LineSegment from: ${args}!`);
}
/** @return {Line} */


function line() {
  for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
  }

  if (args.length === 1 && args[0] instanceof Line) {
    return args[0];
  } else if (args.length === 4 && args.every(isNumeric)) {
    var x1 = args[0],
        y1 = args[1],
        x2 = args[2],
        y2 = args[3];
    return new Line(x1, y1, x2, y2);
  } else if (args.length === 1 && isLineLike(args[0])) {
    var _args$9 = args[0],
        _x8 = _args$9.x1,
        _y8 = _args$9.y1,
        _x9 = _args$9.x2,
        _y9 = _args$9.y2;
    return new Line(_x8, _y8, _x9, _y9);
  } else if (args.length === 2 && args.every(isPointLike)) {
    var _args$10 = args[0],
        _x10 = _args$10.x,
        _y10 = _args$10.y,
        _args$11 = args[1],
        _x11 = _args$11.x,
        _y11 = _args$11.y;
    return new Line(_x10, _y10, _x11, _y11);
  }

  throw new TypeError(`Can't construct a LineSegment from: ${args}!`);
}

var Point =
/*#__PURE__*/
function () {
  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = Number(x);
    this.y = Number(y);
  }

  _createClass(Point, [{
    key: "negated",
    value: function negated() {
      return point(-this.x, -this.y);
    }
  }, {
    key: "translate",
    value: function translate(p) {
      var other = point(p);
      return point(this.x + other.x, this.y + other.y);
    }
  }, {
    key: "lineSegmentTo",
    value: function lineSegmentTo(p) {
      var other = point(p);
      return lineSegment(this.x, this.y, other.x, other.y);
    }
  }, {
    key: "distanceFromPoint",
    value: function distanceFromPoint(p) {
      var other = point(p); // eslint-disable-next-line no-restricted-properties

      return Math.sqrt(Math.pow((other.x - this.x, 2), 2) + Math.pow(other.y - this.y, 2));
    }
  }]);

  return Point;
}();

exports.Point = Point;
exports.Dimension = Dimension;
exports.Rectangle = Rectangle;
exports.LineSegment = LineSegment;
exports.Line = Line;
exports.point = point;
exports.dimension = dimension;
exports.rectangle = rectangle;
exports.lineSegment = lineSegment;
exports.line = line;
