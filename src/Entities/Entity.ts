import { Container, Point, Sprite } from "pixi.js";
import { Manager } from "../Manager";
import { tileSize } from "../Utilities/constants";

export class Entity extends Container {
  public sprite: Sprite;
  public velocity: Point;
  public shouldBeRemoved: boolean;

  constructor(x: number, y: number, texture: string = 'logo') {
    super();

    this.sprite = Sprite.from(texture);
    this.velocity = new Point(0, 0);
    this.shouldBeRemoved = false;

    if (this.sprite) {
      this.sprite.anchor.set(0.5);
      this.sprite.x = x;
      this.sprite.y = y;
      this.sprite.width = tileSize;
      this.sprite.height = tileSize;
    }
  }

  public update(): void {
    this.updateMovement();
  }

  private updateMovement(): void {
    this.sprite.x += this.velocity.x * Manager.deltaTime();
    this.sprite.y += this.velocity.y * Manager.deltaTime();
  }
};
