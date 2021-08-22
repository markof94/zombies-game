import { Point } from "pixi.js"

const Subtract = (pointA: Point, pointB: Point): Point => {
  const x = pointA.x - pointB.x;
  const y = pointA.y - pointB.y;
  return new Point(x, y);
};

export default Subtract;