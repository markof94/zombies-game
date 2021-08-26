import { Sprite } from "pixi.js";

const boxCollision = (a: Sprite, b: Sprite): boolean => {
  const ab = a.getBounds();
  const bb = b.getBounds();
  return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
};

export default boxCollision;