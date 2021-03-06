import { Point, Sprite } from "pixi.js";
import { Keyboard } from "../Utilities/Keyboard";
import { Entity } from "./Entity";
import normalize from "../Utilities/Vector/normalize";
import { Smooth } from "../Utilities/Smooth";
import { TAG_PLAYER, TAG_WALL, tileSize } from "../Utilities/constants";
import magnitude from "../Utilities/Vector/magnitude";
import { Manager } from "../Manager";
import getAngle from "../Utilities/Vector/getAngle";
import subtract from "../Utilities/Vector/subtract";

export class Player extends Entity {
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
    this.tag = TAG_PLAYER;
  }

  private setupCollision(): void {
    this.collisionMask = ['bullet', 'player'];
    this.collisionSprite.width = tileSize / 3;
    this.collisionSprite.height = tileSize / 2;
    this.collisionSprite.anchor.set(0.5, 0);
  }

  public update(): void {
    super.update();
    this.handleControls();
    this.assignAppropriateAnimations();
    this.sprite.zIndex = this.sprite.y + this.sprite.height;
  }

  private handleControls(): void {
    const holdingKeyUp = Keyboard.state.get('ArrowUp') || Keyboard.state.get('KeyW');
    const holdingKeyDown = Keyboard.state.get('ArrowDown') || Keyboard.state.get('KeyS');
    const holdingKeyLeft = Keyboard.state.get('ArrowLeft') || Keyboard.state.get('KeyA');
    const holdingKeyRight = Keyboard.state.get('ArrowRight') || Keyboard.state.get('KeyD');

    let xAxis = 0;
    let yAxis = 0;

    if (holdingKeyUp) yAxis = -1;
    if (holdingKeyDown) yAxis = 1;
    if (holdingKeyRight) xAxis = 1;
    if (holdingKeyLeft) xAxis = -1;

    this.movementAxis.x = xAxis;
    this.movementAxis.y = yAxis;
    this.movementAxis = normalize(this.movementAxis);

    this.velocity.x = Smooth(this.velocity.x, this.movementAxis.x * this.maxSpeed, 3);
    this.velocity.y = Smooth(this.velocity.y, this.movementAxis.y * this.maxSpeed, 3);

    const animSpeed = magnitude(this.velocity) * 0.05 * Manager.deltaTime();
    this.sprite.animationSpeed = animSpeed;
  }

  private assignAppropriateAnimations(): void {
    const cursorPosition = Manager.cursorPosition();
    const angle = getAngle(subtract(cursorPosition, this.collisionSprite.position));

    if ((angle >= 0 && angle < 45) || (angle >= 315 && angle < 360)) {
      this.setAnimationSheetByName('playerRight');
    } else if (angle >= 45 && angle < 135) {
      this.setAnimationSheetByName('playerDown');
    } else if (angle >= 135 && angle < 225) {
      this.setAnimationSheetByName('playerLeft');
    } else {
      this.setAnimationSheetByName('playerUp');
    }
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
