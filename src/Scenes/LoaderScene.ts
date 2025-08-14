import { Container, Graphics, Assets, Texture } from "pixi.js";
import { assets } from "../assets";
import { IScene, Manager } from "../Manager";
import { GameScene } from "./GameScene";

export class LoaderScene extends Container implements IScene {
  // for making our loader graphics...
  private loaderBar: Container;
  private loaderBarBoder: Graphics;
  private loaderBarFill: Graphics;
  
  // Store loaded assets
  private loadedAssets: Map<string, Texture> = new Map();

  constructor() {
    super();

    const loaderBarWidth = Manager.width * 0.8;

    this.loaderBarFill = new Graphics();
    this.loaderBarFill.fill({ color: 0x008800, alpha: 1 });
    this.loaderBarFill.rect(0, 0, loaderBarWidth, 50);
    this.loaderBarFill.scale.x = 0;

    this.loaderBarBoder = new Graphics();
    this.loaderBarBoder.setStrokeStyle({ width: 10, color: 0x0, alpha: 1 });
    this.loaderBarBoder.rect(0, 0, loaderBarWidth, 50);

    this.loaderBar = new Container();
    this.loaderBar.addChild(this.loaderBarFill);
    this.loaderBar.addChild(this.loaderBarBoder);
    this.loaderBar.position.x = (Manager.width - this.loaderBar.width) / 2;
    this.loaderBar.position.y = (Manager.height - this.loaderBar.height) / 2;
    this.addChild(this.loaderBar);

    // Start loading assets
    this.loadAssets();
  }

  private async loadAssets(): Promise<void> {
    try {
      let loadedCount = 0;
      const totalAssets = assets.length;

      console.log("Starting to load assets...");

      // Load assets individually with progress tracking
      for (const asset of assets) {
        try {
          console.log(`Loading ${asset.name} from ${asset.url}...`);
          
          // Load the asset using PixiJS v8 Assets system
          const loadedAsset = await Assets.load(asset.url);
          
          if (loadedAsset) {
            // Store the loaded asset in our map
            this.loadedAssets.set(asset.name, loadedAsset);
            console.log(`✓ Successfully loaded ${asset.name}`);
          } else {
            console.warn(`⚠ Failed to load ${asset.name} - no asset returned`);
          }
        } catch (error) {
          console.error(`✗ Failed to load ${asset.name}:`, error);
        }
        
        loadedCount++;
        this.downloadProgress(loadedCount / totalAssets);
      }

      console.log("Asset loading complete!");
      console.log("Loaded assets:", Array.from(this.loadedAssets.keys()));
      console.log("Total loaded assets:", this.loadedAssets.size);
      
      // Store the loaded assets globally so other parts of the app can access them
      (globalThis as any).__LOADED_ASSETS__ = this.loadedAssets;
      
      // Add a small delay to ensure assets are fully processed
      setTimeout(() => {
        console.log("Starting game scene...");
        this.gameLoaded();
      }, 100);
    } catch (error) {
      console.error("Failed to load assets:", error);
    }
  }

  private downloadProgress(progress: number): void {
    this.loaderBarFill.scale.x = progress;
  }

  private gameLoaded(): void {
    // Change scene to the game scene!
    Manager.changeScene(new GameScene());
  }

  public update(deltaMS: number): void {
    // To be a scene we must have the update method even if we don't use it.
  }
}
