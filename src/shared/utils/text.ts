function findFirstNonWhiteSpaceCharacterIndex(text: string): number {
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== " ") {
      return i;
    }
  }
  return -1;
}
export function capitalizeFirstLetter(string) {
  const i = findFirstNonWhiteSpaceCharacterIndex(string);
  return string.charAt(i).toUpperCase() + string.slice(i + 1);
}
