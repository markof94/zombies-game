import { Container, Graphics, InteractionEvent, Point } from "pixi.js";
import { Entity } from "../Entities/Entity";
import { Player } from "../Entities/Player";
import createBullet from "../GameActions/createBullet";
import { IScene, Manager } from "../Manager";
import level from '../Levels/level.json';
import { tileSize } from "../Utilities/constants";
import { Wall } from "../Entities/Wall";
import canEntitiesCollide from "../Utilities/Collision/canEntitiesCollide";
import { Door } from "../Entities/Door";
import getInteractablesInRange from "../GameActions/getInteractablesInRange";

export class GameScene extends Container implements IScene {
  private player: Player;
  private entities: Entity[] = [];
  private interactablesInRange: Entity[] = [];
  private activeInteractable: Entity = null;

  constructor() {
    super();

    this.addBackground();
    this.generateLevel();
    this.setupControls();
  }

  private addBackground(): void {
    const graphics = new Graphics();
    graphics.beginFill(0x757575);
    graphics.drawRect(0, 0, Manager.width, Manager.height);
    this.addChild(graphics);
    this.sortableChildren = true;
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
          case 3:
            this.createDoor(x, y);

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

  private createDoor(x: number, y: number): void {
    const door = new Door({ x, y });
    this.addEntity(door);
  }

  private setupControls(): void {
    this.on('pointerdown', this.handleTap, this);
    document.addEventListener('keydown', (e) => this.onKeyDown(e));
    this.interactive = true;
  }

  private onKeyDown(event: KeyboardEvent): void {
    const { code } = event;
    if (code === 'KeyE') {
      if (this.activeInteractable) this.activeInteractable.onInteract();
    }
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
    this.updateEntities();
    this.checkForExpiredEntities();
    this.updateListOfInteractablesInRange();
  }

  private updateEntities(): void {
    this.entities.forEach((entity) => {
      entity.update();
      this.checkCollisionsFor(entity);
      if (this.activeInteractable === entity) {
        entity.onEnterInteractRange();
      } else {
        entity.onLeaveInteractRange();
      }
    });
  }

  public checkCollisionsFor(entity: Entity): void {
    this.entities.forEach((entityB) => {
      if (entity === entityB) return;
      if (!canEntitiesCollide(entity, entityB)) return;

      entity.checkCollision(entityB);
    });
  }

  private addEntity(entity: Entity): void {
    this.entities.push(entity);
    this.addChild(entity.sprite);
  }

  private checkForExpiredEntities(): void {
    for (let i = this.entities.length - 1; i >= 0; i--) {
      if (this.entities[i].shouldBeRemoved) {
        this.removeChild(this.entities[i].sprite);
        this.entities.splice(i, 1);
      }
    }
  }

  private updateListOfInteractablesInRange(): void {
    this.interactablesInRange = getInteractablesInRange(this.player, this.entities);
    if (this.interactablesInRange.length > 0) {
      this.activeInteractable = this.interactablesInRange[0];
    } else {
      this.activeInteractable = null;
    }

  }
}