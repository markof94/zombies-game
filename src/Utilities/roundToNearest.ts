export const roundToNearest = (current: number, target: number): number => {
  return Math.floor(current / target) * target;
}