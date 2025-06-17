export const contentTypes = [
  "image",
  "video",
  "article",
  "audio",
  "youtube",
  "tweet",
  "pdf",
  "text",
];

const MIMETYPES: Record<string, "youtube" | "application/pdf" | "text/plain"> =
  {
    pdf: "application/pdf",
    text: "text/plain",
    youtube: "youtube",
  };

export const getMimeType = (type: "pdf" | "text" | "youtube") => {
  return MIMETYPES[type];
};
