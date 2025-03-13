import { cleanExtractedText } from "./onlyText";

export const spellCheckWithLanguageTool = async (text) => {
  try {
    const response = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        language: "en-US",
        text: text,
      }),
    });

    const data = await response.json();

    let correctedText = text;

    if (data.matches.length > 0) {
      data.matches.forEach((match) => {
        if (match.replacements && match.replacements.length > 0) {
          const replacement = match.replacements[0].value;
          const regex = new RegExp(`\\b${match.context.text}\\b`, "g");
          correctedText = correctedText.replace(regex, replacement);
        }
      });
    }

    // Apply additional cleaning after correction
    return cleanExtractedText(correctedText);
  } catch (error) {
    console.error("Spell Check API Error:", error);
    return text;
  }
};
