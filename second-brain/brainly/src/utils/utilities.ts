export const extractEmbeddId = (url: string) => {
  let embeddId;
  if (url.includes("youtube.com/watch?v=")) {
    embeddId = url.split("v=")[1];
    const ampersandPosition = embeddId.indexOf("&");
    if (ampersandPosition !== -1) {
      embeddId = embeddId.substring(0, ampersandPosition);
    }
  } else if (url.includes("youtu.be/")) {
    embeddId = url.split("youtu.be/")[1];
    const questionmarkPosition = embeddId.indexOf("?");
    if (questionmarkPosition !== -1) {
      embeddId = embeddId.substring(0, questionmarkPosition);
    }
  }
  return embeddId;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB");
};
