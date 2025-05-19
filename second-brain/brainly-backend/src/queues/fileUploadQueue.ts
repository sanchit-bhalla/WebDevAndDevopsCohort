import { Queue } from "bullmq";
import { FILE_UPLOAD_QUEUE } from "../constants";
import { VALKEY_HOST, VALKEY_PORT } from "../config";

export const fileUploadQueue = new Queue(FILE_UPLOAD_QUEUE, {
  connection: {
    host: VALKEY_HOST,
    port: Number(VALKEY_PORT),
  },
});
