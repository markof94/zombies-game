const getAngle = (point: any): number => {
  const angle = Math.atan2(point.y, point.x);
  const degrees = 180 * angle / Math.PI;
  return (360 + Math.round(degrees)) % 360;
}

export default getAngle;