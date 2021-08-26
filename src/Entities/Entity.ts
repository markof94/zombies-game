import { Container, Point, Sprite } from "pixi.js";
import { Manager } from "../Manager";
import boxCollision from "../Utilities/Collision/boxCollision";
import { tileSize } from "../Utilities/constants";

export class Entity extends Container {
  public sprite: Sprite;
  public collisionSprite: Sprite;
  public velocity: Point;
  public shouldBeRemoved: boolean;
  public tag: string;
  public collisionMask: string[] = [];
  public previousPosition: Point;
  public collisionBounds: any;

  constructor(x: number, y: number, texture: string = 'logo', data: any = {}) {
    super();

    this.sprite = Sprite.from(texture);
    this.collisionSprite = new Sprite();
    this.velocity = new Point(0, 0);
    this.shouldBeRemoved = false;

    if (this.sprite) {
      this.sprite.anchor.set(0.5);
      this.sprite.x = x;
      this.sprite.y = y;
      this.sprite.width = tileSize;
      this.sprite.height = tileSize;
      this.previousPosition = this.sprite.position.clone();

      this.collisionSprite.anchor.set(0.5);
      this.collisionSprite.x = x;
      this.collisionSprite.y = y;
      this.collisionSprite.width = tileSize;
      this.collisionSprite.height = tileSize;

      Object.assign(this.sprite, { entity: this });
    }

    Object.assign(this, data);
  }

  public update(): void {
    this.updateMovement();
  }

  private updateMovement(): void {
    this.previousPosition = new Point(this.collisionSprite.x, this.collisionSprite.y);
    this.collisionSprite.x += this.velocity.x * Manager.deltaTime();
    this.collisionSprite.y += this.velocity.y * Manager.deltaTime();

    this.sprite.x = this.collisionSprite.x;
    this.sprite.y = this.collisionSprite.y;
    this.sprite.angle = this.collisionSprite.angle;
  }

  public checkCollision(other: Entity): void {
    if (boxCollision(this.collisionSprite, other.collisionSprite)) {
      this.onCollision(other);
    }
  }

  public onCollision(other: Entity): void {
    // 
  }

  public getRemoved(): void {
    this.shouldBeRemoved = true;
  }
};
