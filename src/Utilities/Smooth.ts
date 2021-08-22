export const Smooth = (current: number, goal: number, factor: number): number => {
  return ((current * (factor - 1)) + goal) / factor;
}