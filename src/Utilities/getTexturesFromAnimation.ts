import { Texture } from "pixi.js";

const getTexturesFromAnimation = (animationName: string): Texture[] => {
  const textures: Texture[] = [];
  let i = 0;

  while (1) {
    const texture = Texture.from(`${animationName}-${i}.png`);

    if (!texture || !texture.valid) {
      break;
    }

    textures.push(texture);
    i += 1;
  }

  return textures;
};

export default getTexturesFromAnimation;