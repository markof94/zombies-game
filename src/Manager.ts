import { Application, Point, SCALE_MODES, Container } from "pixi.js";
import { Keyboard } from "./Utilities/Keyboard";

export class Manager {
  private constructor() { /*this class is purely static. No constructor to see here*/ }

  private static app: Application;
  private static currentScene: IScene;
  private static lastTimestamp: number = 0;

  private static _width: number;
  private static _height: number;


  public static get width(): number {
    return Manager._width;
  }
  public static get height(): number {
    return Manager._height;
  }

  public static initialize(width: number, height: number, background: number): void {

    Manager._width = width;
    Manager._height = height;

    // In PixiJS v8, use Application.init() instead of constructor options
    Manager.app = new Application();
    Manager.app.init({
      view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
      resolution: window.devicePixelRatio || 1,
      backgroundColor: background,
      width: width,
      height: height
    });

    Manager.app.stage.sortableChildren = true;

    Keyboard.initialize();

    // In PixiJS v8, use requestAnimationFrame for the game loop
    Manager.startGameLoop();
  }

  public static changeScene(newScene: IScene): void {
    if (Manager.currentScene) {
      Manager.app.stage.removeChild(Manager.currentScene);
      Manager.currentScene.destroy();
    }

    Manager.currentScene = newScene;
    Manager.app.stage.addChild(Manager.currentScene);
  }

  public static delta(): number {
    // Calculate delta based on tracked timestamp
    if (Manager.lastTimestamp === 0) {
      return 16.67; // Default for first frame
    }
    const currentTime = performance.now();
    return currentTime - Manager.lastTimestamp;
  }

  public static deltaTime(): number {
    // Calculate delta time in seconds
    return Manager.delta() / 1000;
  }

  public static getFPS(): number {
    // In PixiJS v8, we can't easily get maxFPS, so return a default value
    return 60;
  }

  public static cursorPosition(): Point{
    // Simplified cursor position for now
    return new Point(0, 0);
  }

  private static startGameLoop(): void {
    const gameLoop = (timestamp: number) => {
      if (Manager.currentScene) {
        Manager.currentScene.update(timestamp);
      }
      Manager.lastTimestamp = timestamp;
      requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);
  }
}

// This could have a lot more generic functions that you force all your scenes to have. Update is just an example.
// Also, this could be in its own file...
export interface IScene extends Container {
  update(deltaMS: number): void;
}