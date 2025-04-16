export function rgbToHex(red: number, green: number, blue: number) {
  const rgb = (red << 16) | (green << 8) | (blue << 0);
  return '#' + (0x1000000 + rgb).toString(16).slice(1);
}

export function cnvrtRGBClrToHex(color: string): string {
  const rgbClr = color.split(',');
  const r = parseInt(rgbClr[0]);
  const g = parseInt(rgbClr[1]);
  const b = parseInt(rgbClr[2]);

  return rgbToHex(r, g, b);
}
