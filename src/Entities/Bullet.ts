import { Point, Sprite } from "pixi.js";
import { Manager } from "../Manager";
import { tileSize } from "../Utilities/constants";
import { Keyboard } from "../Utilities/Keyboard";
import getAngle from "../Utilities/Vector/getAngle";
import { Entity } from "./Entity";

export class Bullet extends Entity {
  public sprite: Sprite;
  public moveSpeed: number = 200;

  constructor(x: number, y: number, texture: string = 'logo', data) {
    super(x, y, texture);

    const {
      direction
    } = data;

    this.velocity.x = direction.x * this.moveSpeed;
    this.velocity.y = direction.y * this.moveSpeed;
    this.sprite.width = tileSize / 6;
    this.sprite.height = tileSize / 6;
    this.sprite.angle = getAngle(direction);
  }

  public update(): void {
    super.update();
  }
};
