export const translateText = async (text, targetLanguage = "es") => {
  const apiKey = process.env.REACT_APP_TRANSLATE_API_KEY;
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage, 
        }),
      });
  
      const data = await response.json();
      console.log("Translation API Response:", data); // Log response for debugging
  
      if (data && data.data && data.data.translations) {
        return data.data.translations[0].translatedText;
      } else {
        console.error("Translation API Error: Invalid response format", data);
        return text; // Return original text if translation fails
      }
    } catch (error) {
      console.error("Translation API Error:", error);
      return text; // Return original text if translation fails
    }
  };
  