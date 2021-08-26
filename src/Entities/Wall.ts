import { Point, Sprite } from "pixi.js";
import { TAG_WALL } from "../Utilities/constants";
import { Entity } from "./Entity";

export class Wall extends Entity {
  public sprite: Sprite;

  constructor(data: any) {
    super({ ...data, texture: 'wall' });
    this.tag = TAG_WALL;
  }

  public update(): void {
    super.update();
  }
};
