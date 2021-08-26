import { Container, Graphics, InteractionEvent, Point } from "pixi.js";
import { Entity } from "../Entities/Entity";
import { Player } from "../Entities/Player";
import createBullet from "../GameActions/createBullet";
import { IScene, Manager } from "../Manager";
import level from '../Levels/level.json';
import { TAG_PLAYER, tileSize } from "../Utilities/constants";
import { Wall } from "../Entities/Wall";
import boxCollision from "../Utilities/Collision/boxCollision";
import canEntitiesCollide from "../Utilities/Collision/canEntitiesCollide";

export class GameScene extends Container implements IScene {
  private player: Player;
  private entities: Entity[] = [];

  constructor() {
    super();

    this.addBackground();
    this.generateLevel();
    this.setUpTapListener();
  }

  private addBackground(): void {
    const graphics = new Graphics();
    graphics.beginFill(0x757575);
    graphics.drawRect(0, 0, Manager.width, Manager.height);
    this.addChild(graphics);
  }

  private generateLevel(): void {
    const { structure } = level;

    for (let i = 0; i < structure.length; i++) {
      for (let j = 0; j < structure[i].length; j++) {
        const element = structure[i][j];
        const x = j * tileSize + tileSize / 2;
        const y = i * tileSize + tileSize / 2;

        switch (element) {
          case 1:
            this.createPlayer(x, y);
            break;
          case 2:
            this.createWall(x, y);
            break;

          default:
            break;
        }
      }
    }
  }

  private createPlayer(x: number, y: number): void {
    this.player = new Player({ x, y });
    this.addEntity(this.player);
  }

  private createWall(x: number, y: number): void {
    const wall = new Wall({ x, y });
    this.addEntity(wall);
  }

  private setUpTapListener(): void {
    this.on('pointerdown', this.handleTap, this);
    this.interactive = true;
  }

  private handleTap(e: InteractionEvent): void {
    const tapPoint = e.data.global;
    this.shootBullet(this.player.sprite.position, tapPoint);
  }

  public shootBullet(originPosition: any, targetPosition: any): void {
    const bullet = createBullet(originPosition, targetPosition, { owner: this.player });
    this.addEntity(bullet);
  }

  public update(deltaMS: number): void {
    this.entities.forEach((entity) => {
      entity.update();
      this.checkCollisionsFor(entity);
    });

    this.checkForExpiredEntities();
  }

  public checkCollisionsFor(entity: Entity): void {
    this.entities.forEach((entityB) => {
      if (entity === entityB) return;
      if (!canEntitiesCollide(entity, entityB)) return;

      entity.checkCollision(entityB);
    });
  }

  private addEntity(entity: Entity) {
    this.entities.push(entity);
    this.addChild(entity.sprite);
  }

  private checkForExpiredEntities() {
    for (let i = this.entities.length - 1; i >= 0; i--) {
      if (this.entities[i].shouldBeRemoved) {
        this.removeChild(this.entities[i].sprite);
        this.entities.splice(i, 1);
      }
    }
  }
}