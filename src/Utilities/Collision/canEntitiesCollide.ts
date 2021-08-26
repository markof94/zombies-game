import { Entity } from "../../Entities/Entity";

const canEntitiesCollide = (entityA: Entity, entityB: Entity) => {
  return !entityA.collisionMask.includes(entityB.tag);
}

export default canEntitiesCollide;