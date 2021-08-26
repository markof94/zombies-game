import { Point } from "pixi.js"
import { Entity } from "../Entities/Entity";
import { interactRange, TAG_PLAYER } from "../Utilities/constants";
import distanceBetween from "../Utilities/Vector/distanceBetween";

const getInteractablesInRange = (player: Entity, entities: Entity[]): Entity[] => {
  return entities.filter((entity) => {
    return entity.tag !== TAG_PLAYER
      && entity.interactable
      && distanceBetween(player.collisionSprite.position, entity.collisionSprite.position) <= interactRange;
  });
};

export default getInteractablesInRange;