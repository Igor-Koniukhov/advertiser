/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { onDocumentWritten } from "firebase-functions/lib/v2/providers/firestore";
import { AppEvent } from "../../src/app/types/event";

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const eventWritten = onDocumentWritten("adds/{docId}", async (event) => {
  logger.info("===Event Written start===");
  const beforeData = event.data?.before.data() as AppEvent;
  console.log(beforeData);
});
