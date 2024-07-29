import { ColorMappingProps } from "../interfaces";

function hexToRgb(hex: string): [number, number, number] {
  let r: number, g: number, b: number;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  } else {
    throw new Error("Invalid HEX color");
  }
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

export const colorMapping = ({
  index,
  value,
  minValue,
  maxValue,
  reverse,
}: ColorMappingProps) => {
  index = index > 5 ? index % 5 : index;
  const colourPairs = [
    { maxColor: "#bfadf3", minColor: "#ede8fc" },
    { maxColor: "#ffbfeb", minColor: "#ffeaf8" },
    { maxColor: "#16abd4", minColor: "#aee7f7" },
    { maxColor: "#f1c9a6", minColor: "#f1e1d3" },
    { maxColor: "#edeb88", minColor: "#e5e5c3" },
    { maxColor: "#c1c6bc", minColor: "#eaeee6" },
  ];
  const minColor = reverse
    ? colourPairs[index].maxColor
    : colourPairs[index].minColor;
  const maxColor = reverse
    ? colourPairs[index].minColor
    : colourPairs[index].maxColor;

  const [r1, g1, b1] = hexToRgb(minColor);
  const [r2, g2, b2] = hexToRgb(maxColor);

  const ratio = (value - minValue) / (maxValue - minValue);

  const r = Math.round(r1 + (r2 - r1) * ratio);
  const g = Math.round(g1 + (g2 - g1) * ratio);
  const b = Math.round(b1 + (b2 - b1) * ratio);

  return rgbToHex(r, g, b);
};
