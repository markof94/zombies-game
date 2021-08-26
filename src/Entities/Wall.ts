import { Point, Sprite } from "pixi.js";
import { TAG_WALL } from "../Utilities/constants";
import { Entity } from "./Entity";

export class Wall extends Entity {
  public sprite: Sprite;

  constructor(x: number, y: number, texture: string = 'logo', data: any) {
    super(x, y, texture, data);
    this.tag = TAG_WALL;
  }

  public update(): void {
    super.update();
  }
};
