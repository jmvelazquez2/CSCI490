export const cleanExtractedText = (text) => {
    return text
      .split(/\s+/) // Split text into words
      .filter((word) => {
        return (
          /^[a-zA-Z]+$/.test(word) && // Keep only alphabetic words (remove symbols & numbers)
          //[aeiouy]/i.test(word) && // Keep words with vowels (likely real words)
          word.length > 1 // Remove single-letter words (likely noise)
        );
      })
      .join(" ");
  };
  