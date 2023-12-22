type colorByValueProps = {
  value: number;
  max: number;
  min: number;
};
export const colorByValue = ({ value, max, min }: colorByValueProps) => {
  const R = 255 * ((value - min) / max);
  const B = 255 - 255 * ((value - min) / max);
  const G = 128 - 128 * ((value - min) / max);
  return `rgb(${R},${G},${B})`;
};
