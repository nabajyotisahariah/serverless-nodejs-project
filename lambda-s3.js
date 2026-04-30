const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const sharp = require("sharp");

const s3 = new S3Client({
  region: process.env.AWS_REGION || "ap-south-1",
});

const streamToBuffer = async (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
};

exports.triggerCopy = async (event) => {
  try {
    const record = event.Records[0];
    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key);

    console.log("Processing:", key);

    if (!key.startsWith("upload/")) return;

    const file = await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    );

    const bodyBuffer = await streamToBuffer(file.Body);

    const resizedImage = await sharp(bodyBuffer)
      .resize(400)
      .toBuffer();

    const newKey = key.replace("upload/", "upload-resized/");

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: newKey,
        Body: resizedImage,
        ContentType: "image/jpeg",
      })
    );

    console.log("Saved:", newKey);
  } catch (err) {
    console.error(err);
    throw err;
  }
};