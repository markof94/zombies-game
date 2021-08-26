import { Point, Sprite, Texture } from "pixi.js";
import { TAG_WALL, tileSize } from "../Utilities/constants";
import { Entity } from "./Entity";

export class Door extends Entity {
  public sprite: Sprite;
  public isOpen: boolean = false;
  public textureOpen: Texture;
  public textureClosed: Texture;

  constructor(data: any) {
    super({ ...data, texture: 'doorClosed' });
    this.tag = TAG_WALL;

    this.collisionSprite.height = tileSize / 2;
    this.collisionSprite.anchor.set(0.5, 0);

    this.textureOpen = Texture.from('doorOpen');
    this.textureClosed = Texture.from('doorClosed');
    this.interactable = true;
  }

  public open(): void {
    this.isOpen = true;
    this.ignoreCollision = true;
    this.sprite.texture = this.textureOpen;
  }

  public close(): void {
    this.isOpen = false;
    this.ignoreCollision = false;
    this.sprite.texture = this.textureClosed;
  }

  public update(): void {
    super.update();
  }

  public onInteract(): void {
    if (this.isOpen) this.close();
    else this.open();
  }
};
