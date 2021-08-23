import { Point, Sprite } from "pixi.js";
import { Entity } from "./Entity";

export class Wall extends Entity {
  public sprite: Sprite;

  constructor(x: number, y: number, texture: string = 'logo') {
    super(x, y, texture);
  }

  public update(): void {
    super.update();
  }
};
