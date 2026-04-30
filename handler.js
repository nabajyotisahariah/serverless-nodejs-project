const serverless = require("serverless-http");
const app = require("./src/app");

// ✅ ADD THESE LINES
const AWS = require("aws-sdk");
const S3 = new AWS.S3();
const sharp = require("sharp");

//App entry point
exports.handler = serverless(app);

// NEW: S3 Trigger Handler
exports.s3Handler = async (event) => {
  try {
    const record = event.Records[0];
    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key);

    console.log("Processing:", key);

    // Only process files inside upload/
    if (!key.startsWith("upload/")) return;

    const file = await S3.getObject({
      Bucket: bucket,
      Key: key,
    }).promise();

    const resizedImage = await sharp(file.Body)
      .resize(400)
      .toBuffer();

    const newKey = key.replace("upload/", "upload-resized/");

    await S3.putObject({
      Bucket: bucket,
      Key: newKey,
      Body: resizedImage,
      ContentType: "image/jpeg",
    }).promise();

    console.log("Saved:", newKey);

  } catch (err) {
    console.error(err);
    throw err;
  }
};