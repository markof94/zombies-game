import { Point } from "pixi.js";
import { Bullet } from "../Entities/Bullet";
import normalize from "../Utilities/Vector/normalize";
import subtract from "../Utilities/Vector/subtract";

const createBullet = (originPosition: any, targetPosition: any, data: any): Bullet => {
  const targetPoint = new Point(targetPosition.x, targetPosition.y);
  const directionFromPlayer = normalize(subtract(targetPoint, originPosition));

  const { x, y } = originPosition;
  const bullet = new Bullet(x, y, 'bullet', { direction: directionFromPlayer, ...data });
  return bullet;
}

export default createBullet;