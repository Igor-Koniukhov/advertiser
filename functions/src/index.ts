import {
  onDocumentCreated,
  onDocumentDeleted,
  onDocumentUpdated,
} from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { generateThumbnail } from "./thumbnails";

admin.initializeApp();

exports.userAdded = functions.auth.user().onCreate((user) => {
  const userEmail = user.email;
  const userId = user.uid;

  console.log(`New user: ${userId} with email: ${userEmail}`);
});

exports.fileAdded = functions.storage.object().onFinalize((object) => {
  const filePath = object.name;
  const fileSize = object.size;
  console.log(`File was added: ${filePath}, size: ${fileSize}`);
});

export const logDocumentAddition = onDocumentCreated(
  "/adds/{docId}",
  (event) => {
    logger.info("Document added", {
      docId: event.params.docId,
      data: event.data,
    });
  },
);

export const logDocumentUpdate = onDocumentUpdated("/adds/{docId}", (event) => {
  logger.info("Document updated", {
    docId: event.params.docId,
    before: event.data?.before.data(),
    after: event.data?.after.data(),
  });
});

export const logDocumentDeletion = onDocumentDeleted(
  "/adds/{docId}",
  (event) => {
    logger.info("Document deleted", {
      docId: event.params.docId,
      data: event.data?.data(),
    });
  },
);

export { generateThumbnail };
