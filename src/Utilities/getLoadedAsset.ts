import { Texture } from "pixi.js";

/**
 * Get a loaded asset by name
 * @param name The name of the asset to retrieve
 * @returns The loaded texture or undefined if not found
 */
export function getLoadedAsset(name: string): Texture | undefined {
  const loadedAssets = (globalThis as any).__LOADED_ASSETS__ as Map<string, Texture>;
  
  if (!loadedAssets) {
    console.warn("No loaded assets found. Make sure assets are loaded first.");
    return undefined;
  }
  
  console.log(`Requesting asset: "${name}"`);
  console.log(`Available assets:`, Array.from(loadedAssets.keys()));
  
  const asset = loadedAssets.get(name);
  
  if (!asset) {
    console.warn(`Asset "${name}" not found. Available assets:`, Array.from(loadedAssets.keys()));
    return undefined;
  }
  
  console.log(`✓ Found asset: "${name}"`);
  return asset;
}

/**
 * Check if an asset is loaded
 * @param name The name of the asset to check
 * @returns True if the asset is loaded, false otherwise
 */
export function isAssetLoaded(name: string): boolean {
  const loadedAssets = (globalThis as any).__LOADED_ASSETS__ as Map<string, Texture>;
  return loadedAssets ? loadedAssets.has(name) : false;
}
