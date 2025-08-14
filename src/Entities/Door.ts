import { Point, Sprite, Texture } from "pixi.js";
import { GameScene } from "../Scenes/GameScene";
import { TAG_WALL, tileSize } from "../Utilities/constants";
import { Entity } from "./Entity";
import { getLoadedAsset } from "../Utilities/getLoadedAsset";

export class Door extends Entity {
  public isOpen: boolean = false;
  public textureOpen: Texture;
  public textureClosed: Texture;

  constructor(data: any) {
    super({ ...data, texture: 'doorClosed' });
    this.tag = TAG_WALL;

    // Use our new asset loading system
    this.textureOpen = getLoadedAsset('doorOpen') || new Texture();
    this.textureClosed = getLoadedAsset('doorClosed') || new Texture();
    this.interactable = true;
  }

  public open(): void {
    this.isOpen = true;
    this.ignoreCollision = true;
    this.sprite.texture = this.textureOpen;
    GameScene.unblockPathCell(this.sprite.x, this.sprite.y);
  }

  public close(): void {
    this.isOpen = false;
    this.ignoreCollision = false;
    this.sprite.texture = this.textureClosed;
    GameScene.blockPathCell(this.sprite.x, this.sprite.y);
  }

  public update(): void {
    super.update();
  }

  public onInteract(): void {
    if (this.isOpen) this.close();
    else this.open();
  }
};
