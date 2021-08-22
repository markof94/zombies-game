import { Container, Graphics, InteractionEvent, Point, Rectangle, Sprite } from "pixi.js";
import { Bullet } from "../Entities/Bullet";
import { Entity } from "../Entities/Entity";
import { Player } from "../Entities/Player";
import { IScene, Manager } from "../Manager";
import Normalize from "../Utilities/Vector/Normalize";
import Subtract from "../Utilities/Vector/Subtract";

export class GameScene extends Container implements IScene {
  private player: Player;
  private entities: Entity[] = [];

  constructor() {
    super();

    this.addBackground();

    this.player = new Player(Manager.width / 2, Manager.height / 2, 'player');
    this.addEntity(this.player);

    this.setUpTapListener();
  }

  private setUpTapListener(): void {
    this.on('pointerdown', this.handleTap, this);
    this.interactive = true;
  }

  private addBackground(): void {
    const graphics = new Graphics();
    graphics.beginFill(0x757575);
    graphics.drawRect(0, 0, Manager.width, Manager.height);
    this.addChild(graphics);
  }

  private handleTap(e: InteractionEvent): void {
    const tapPoint = e.data.global;
    this.shootBullet(tapPoint);
  }

  public shootBullet(target: Point): void {
    const directionVector = Normalize(Subtract(new Point(target.x, target.y), this.player.sprite.position));
    const { x, y } = this.player.sprite.position;
    const bullet = new Bullet(x, y, 'player', { direction: directionVector });
    this.addEntity(bullet);
  }

  public update(deltaMS: number): void {
    this.entities.forEach((entity) => {
      entity.update();
    });
  }

  private addEntity(entity: Entity) {
    this.entities.push(entity);
    this.addChild(entity.sprite);
  }
}