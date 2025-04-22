export const decodeHtmlEntities = (text) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
};
  