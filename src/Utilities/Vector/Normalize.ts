import { Point } from "pixi.js"

const normalize = (point: Point): Point => {
  const magnitude = Math.sqrt((point.x * point.x) + (point.y * point.y));
  if (magnitude <= 0) return new Point(0, 0);
  const x = point.x / magnitude;
  const y = point.y / magnitude;
  return new Point(x, y);
};

export default normalize;