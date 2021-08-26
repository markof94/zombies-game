import { Texture } from "pixi.js";

const getTexturesFromAnimation = (animationName: string): Texture[] => {
  const textures: Texture[] = [];
  let i = 0;
  let valid = true;

  while (valid) {
    const texture = Texture.from(`${animationName}-${i}.png`);

    if (!texture || !texture.valid) {
      valid = false;
      break;
    } else {
      textures.push(texture);
      i += 1;
    }
  }

  return textures;
};

export default getTexturesFromAnimation;