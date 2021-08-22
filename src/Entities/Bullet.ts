import { Point, Sprite } from "pixi.js";
import { Manager } from "../Manager";
import { Keyboard } from "../Utilities/Keyboard";
import { Entity } from "./Entity";
import Normalize from "../Utilities/Vector/Normalize";
import { Smooth } from "../Utilities/Smooth";

export class Bullet extends Entity {
  public sprite: Sprite;
  public moveSpeed: number = 300;

  constructor(x: number, y: number, texture: string = 'logo', data) {
    super(x, y, texture);

    const {
      direction
    } = data;
  
    this.velocity.x = direction.x * this.moveSpeed;
    this.velocity.y = direction.y * this.moveSpeed;

  }

  public update(): void {
    super.update();
  }
};
