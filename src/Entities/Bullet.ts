import { Point, Sprite } from "pixi.js";
import { Manager } from "../Manager";
import { TAG_BULLET, tileSize } from "../Utilities/constants";
import getAngle from "../Utilities/Vector/getAngle";
import { Entity } from "./Entity";

export class Bullet extends Entity {
  public sprite: Sprite;
  public moveSpeed: number = 600;
  public owner: Entity;
  public expireTimer: number = 2;

  constructor(x: number, y: number, texture: string = 'logo', data: any = {}) {
    super(x, y, texture, data);

    this.collisionMask = ['bullet', 'player'];
    this.collisionSprite.width = tileSize / 6;
    this.collisionSprite.height = tileSize / 12;
    this.tag = TAG_BULLET;

    const { direction } = data;

    this.collisionSprite.angle = getAngle(direction);

    this.velocity.x = direction.x * this.moveSpeed;
    this.velocity.y = direction.y * this.moveSpeed;
    this.sprite.width = tileSize / 6;
    this.sprite.height = tileSize / 6;
  }

  public update(): void {
    super.update();
    this.updateExpireTimer();
  }

  private updateExpireTimer(): void {
    this.expireTimer -= Manager.deltaTime();
    if (this.expireTimer <= 0) this.getRemoved();
  }

  public onCollision(other: Entity): void {
    if (other === this.owner) return;

    this.getRemoved();
  }
};
