import { AnimatedSprite, Container, Point, Sprite, Texture } from "pixi.js";
import { Manager } from "../Manager";
import boxCollision from "../Utilities/Collision/boxCollision";
import { tileSize } from "../Utilities/constants";
import getTexturesFromAnimation from "../Utilities/getTexturesFromAnimation";

export class Entity extends Container {
  public sprite: any;
  public collisionSprite: Sprite;
  public velocity: Point;
  public shouldBeRemoved: boolean;
  public tag: string;
  public collisionMask: string[] = [];
  public previousPosition: Point;
  public collisionBounds: any;
  public animations: any[] = [];
  public currentAnimationSheet: string;

  constructor(data: any = {}) {
    super();

    const {
      x,
      y,
      texture,
      sheets,
    } = data;

    this.velocity = new Point(0, 0);
    this.shouldBeRemoved = false;

    this.createSprite(data);
    this.sprite.anchor.set(0.5);
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.width = tileSize;
    this.sprite.height = tileSize;
    this.previousPosition = this.sprite.position.clone();

    this.setupCollisionSprite(x, y);

    Object.assign(this.sprite, { entity: this });
    Object.assign(this, data);
  }

  public createSprite(data): void {
    const {
      sheets,
      texture,
    } = data;

    if (sheets && sheets.length > 0) {
      this.createAnimations(sheets);
      this.sprite = new AnimatedSprite(this.animations[0].textures);
      this.sprite.animationSpeed = 0;
      this.sprite.play();
    } else {
      this.sprite = Sprite.from(texture);
    }
  }

  private createAnimations(sheets: any) {
    sheets.forEach((sheet) => {
      const textures = getTexturesFromAnimation(sheet);
      const newAnimation = { name: sheet, textures };
      this.animations.push(newAnimation);
    });
  }

  public setAnimationSheetByName(name: any): void {
    const animation = this.animations.find((anim) => anim.name === name);
    if (!animation) return;
    if (animation.name === this.currentAnimationSheet) return;

    this.sprite.textures = animation.textures;
    this.sprite.play();
    this.currentAnimationSheet = animation.name;
  }

  public setupCollisionSprite(x: number, y: number): void {
    this.collisionSprite = new Sprite();
    this.collisionSprite.anchor.set(0.5);
    this.collisionSprite.x = x;
    this.collisionSprite.y = y;
    this.collisionSprite.width = tileSize;
    this.collisionSprite.height = tileSize;
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

    this.sprite.zIndex = this.sprite.y;
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
