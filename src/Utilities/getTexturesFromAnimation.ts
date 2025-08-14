import { Texture } from "pixi.js";
import { getLoadedAsset } from "./getLoadedAsset";

const getTexturesFromAnimation = (animationName: string): Texture[] => {
  const textures: Texture[] = [];
  
  try {
    // Get the loaded asset instead of trying to load it
    const loadedAsset = getLoadedAsset(animationName);
    
    if (loadedAsset) {
      // Since these are single images, just use the loaded texture
      textures.push(loadedAsset);
      console.log(`✓ Using loaded texture for ${animationName}`);
    } else {
      console.warn(`⚠ Texture for ${animationName} not found in loaded assets`);
    }
  } catch (error) {
    console.warn(`Failed to get texture for ${animationName}:`, error);
  }
  
  return textures;
};

export default getTexturesFromAnimation;