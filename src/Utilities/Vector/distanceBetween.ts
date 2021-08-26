import { Point } from "pixi.js"
import subtract from "./subtract";

const distanceBetween = (pointA: Point, pointB): number => {
  const sub = subtract(pointB, pointA);
  return Math.sqrt((sub.x * sub.x) + (sub.y * sub.y));
};

export default distanceBetween;