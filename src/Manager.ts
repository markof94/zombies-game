import { Application } from "@pixi/app";
import { DisplayObject } from "@pixi/display";
import { InteractionEvent } from "pixi.js";
import { Keyboard } from "./Utilities/Keyboard";

export class Manager {
  private constructor() { /*this class is purely static. No constructor to see here*/ }

  private static app: Application;
  private static currentScene: IScene;

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

    Manager.app = new Application({
      view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
      resolution: window.devicePixelRatio || 1,
      backgroundColor: background,
      width: width,
      height: height
    });

    Keyboard.initialize();

    Manager.app.ticker.add(Manager.update)
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
    return Manager.app.ticker.deltaMS;
  }

  public static deltaTime(): number {
    return (1.0 / Manager.app.ticker.deltaMS);
  }

  private static update(deltaMS): void {
    if (Manager.currentScene) {
      Manager.currentScene.update(deltaMS);
    }
  }
}

// This could have a lot more generic functions that you force all your scenes to have. Update is just an example.
// Also, this could be in its own file...
export interface IScene extends DisplayObject {
  update(deltaMS: number): void;
}