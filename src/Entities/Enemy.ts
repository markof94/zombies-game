import { Point, Sprite } from "pixi.js";
import { Entity } from "./Entity";
import { TAG_ENEMY, TAG_PLAYER, TAG_WALL, tileSize } from "../Utilities/constants";
import magnitude from "../Utilities/Vector/magnitude";

export class Enemy extends Entity {
  public movementAxis: Point;
  public maxSpeed: number = 50;

  constructor(data: any = {}) {
    super({
      ...data,
      sheets: [
        'playerUp',
        'playerDown',
        'playerLeft',
        'playerRight',
      ]
    });
    this.movementAxis = new Point(0, 0);

    this.setupCollision();
    this.tag = TAG_ENEMY;
  }

  private setupCollision(): void {
    this.collisionMask = ['enemy'];
    this.collisionSprite.width = tileSize / 1.5;
  }

  public update(): void {
    super.update();
    this.assignAppropriateAnimations();
    this.sprite.zIndex = this.sprite.y + this.sprite.height;
  }

  private assignAppropriateAnimations(): void {
    // TODO
  }

  public checkCollision(other: Entity): void {
    super.checkCollision(other);
  }

  public onCollision(other: Entity): void {
    if (other.tag === TAG_WALL) {
      const xOffset = this.previousPosition.x - other.sprite.x;
      const yOffset = this.previousPosition.y - other.sprite.y;
      const xDist = Math.abs(xOffset);
      const yDist = Math.abs(yOffset);

      if (yDist <= xDist) {
        this.collisionSprite.x = this.previousPosition.x + Math.sign(xOffset);
        this.velocity.x = -this.velocity.x * 0.5;
      } else {
        this.collisionSprite.y = this.previousPosition.y + Math.sign(yOffset);
        this.velocity.y = -this.velocity.y * 0.5;
      }
    }
  }

  public getTargetMovementPoint(): Point {
    const mag = magnitude(this.velocity);
    return new Point(this.collisionSprite.x - this.movementAxis.x * mag, this.collisionSprite.y - this.movementAxis.y * mag);
  }

  public stop(): void {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }
};
