interface IndexingVectorStore {
  // filename: string;
  // destination: string;
  type?: "add";
  contentId: string;
  path: string;
  mimetype: "application/pdf" | "text/plain" | "youtube";
  title: string;
  link: string;
  userId: string;
}

interface RemoveJob {
  type?: "remove";
  title: string;
  contentId: string;
  fileId: string;
}

type JobData = IndexingVectorStore | RemoveJob;
