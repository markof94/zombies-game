import { Point } from "pixi.js";
import { Enemy } from "../Entities/Enemy";
import { GameScene } from "../Scenes/GameScene";

export class EnemySpawner {
  public position: Point;
  public scene: GameScene;

  constructor(x, y, scene) {
    this.position = new Point(x, y);
    this.scene = scene;

    this.createEnemy();
  }

  createEnemy(): void {
    const enemy = new Enemy({ x: this.position.x, y: this.position.y });
    this.scene.addEntity(enemy);
  }
};
