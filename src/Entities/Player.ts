import { Point, Sprite } from "pixi.js";
import { Keyboard } from "../Utilities/Keyboard";
import { Entity } from "./Entity";
import normalize from "../Utilities/Vector/normalize";
import { Smooth } from "../Utilities/Smooth";
import { tileSize } from "../Utilities/constants";

export class Player extends Entity {
  public sprite: Sprite;
  public movementAxis: Point;
  public maxSpeed: number = 10;

  constructor(x: number, y: number, texture: string = 'logo') {
    super(x, y, texture);
    this.movementAxis = new Point(0, 0);
  }

  public update(): void {
    super.update();
    this.handleControls();
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

    this.velocity.x = Smooth(this.velocity.x, this.movementAxis.x * this.maxSpeed, 8);
    this.velocity.y = Smooth(this.velocity.y, this.movementAxis.y * this.maxSpeed, 8);

    this.sprite.width = tileSize;
    this.sprite.height = tileSize;

  }
};
