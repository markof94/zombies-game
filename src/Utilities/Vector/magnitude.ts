import { Point } from "pixi.js"

const magnitude = (point: Point): number => {
  return Math.sqrt((point.x * point.x) + (point.y * point.y));
};

export default magnitude;