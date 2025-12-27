/**
 * calculateWPM
 * @param typedChars - Number of characters typed correctly
 * @param elapsedTime - Time elapsed in seconds
 * @returns words per minute
 */
export function calculateWPM(typedChars: number, elapsedTime: number): number {
  if (elapsedTime <= 0) return 0;
  const wordsTyped = typedChars / 5; // standard: 5 chars per word
  const minutes = elapsedTime / 60;
  return Math.round(wordsTyped / minutes);
}
