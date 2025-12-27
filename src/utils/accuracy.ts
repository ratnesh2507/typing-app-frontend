/**
 * calculateAccuracy
 * @param correctChars - Number of correctly typed characters
 * @param totalTypedChars - Total typed characters
 * @returns accuracy in percentage (0-100)
 */
export function calculateAccuracy(
  correctChars: number,
  totalTypedChars: number
): number {
  if (totalTypedChars === 0) return 100; // nothing typed yet
  return Math.round((correctChars / totalTypedChars) * 100);
}
