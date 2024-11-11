// utils/scaled.ts

/**
 * Scales a value by a factor.
 *
 * @param value - The value to scale.
 * @param factor - The scaling factor.
 * @returns The scaled value.
 */
export const scaled = (value: number, factor: number): number => value * factor;

/**
 * Scales and converts a value between different units (px, pt, in).
 *
 * @param value - The value to scale.
 * @param factor - The scaling factor.
 * @param unit - The target unit for conversion ("pt", "px", "in").
 * @returns The scaled and converted value.
 */
export const scaledT = (
  value: number,
  factor: number,
  unit: "pt" | "px" | "in" | "default" = "default" // Default returns scaled value only
): number => {
  const scaledValue = value * factor;

  switch (unit) {
    case "pt": // Convert from px to pt (1px = 0.75pt)
      return scaledValue * 0.75;
    case "px": // Convert from pt to px (1pt = 1.3333px)
      return scaledValue * (96 / 72);
    case "in": // Convert px to inches (96px = 1in)
      return scaledValue / 96;
    default: // Default returns scaled value without conversion
      return scaledValue;
  }
};
