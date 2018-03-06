export default hex => {
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  const a = 1;
  return NSColor.colorWithRed_green_blue_alpha(r, g, b, a);
};
