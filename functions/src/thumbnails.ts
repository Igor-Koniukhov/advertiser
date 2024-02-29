import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sharp from "sharp";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

export const generateThumbnail = functions.storage
  .object()
  .onFinalize(async (object) => {
    const fileBucket = object.bucket;
    const filePath = object.name;
    const contentType = object.contentType;
    const fileName = path.basename(filePath as string);
    const bucket = admin.storage().bucket(fileBucket);

    if (!contentType?.startsWith("image/")) {
      console.log("This is not an image.");
      return null;
    }
    if (fileName.startsWith("thumb_")) {
      console.log("Already a Thumbnail.");
      return null;
    }
    const tempFilePath = path.join(os.tmpdir(), fileName);
    const metadata = {
      contentType: contentType,
    };

    await bucket.file(filePath as string).download({
      destination: tempFilePath,
    });
    console.log("Image downloaded locally to", tempFilePath);

    const thumbFileName = `thumb_${fileName}`;
    const thumbFilePath = path.join(
      path.dirname(filePath as string),
      thumbFileName,
    );
    await sharp(tempFilePath)
      .resize(200, 200)
      .toFile(path.join(os.tmpdir(), thumbFileName));
    console.log("Thumbnail created at", tempFilePath);
    await bucket.upload(path.join(os.tmpdir(), thumbFileName), {
      destination: thumbFilePath,
      metadata: metadata,
    });
    console.log("Thumbnail uploaded to Storage at", thumbFilePath);
    return fs.unlinkSync(tempFilePath);
  });
