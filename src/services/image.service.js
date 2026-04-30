const sharp = require("sharp");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const BUCKET = "s3-image-lambda-demo";
const ORIGINAL_KEY = "office.jpg";
const RESIZED_KEY_200 = "office-200.jpg";
const RESIZED_KEY_400 = "office-400.jpg";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-south-1",
});

const uploadToS3 = async (key, buffer, contentType) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  await s3Client.send(command);
  return `https://${BUCKET}.s3.amazonaws.com/${key}`;
};

exports.uploadAndCrop = async (buffer) => {
    console.log("uploadAndCrop...");
  const originalUrl = await uploadToS3(ORIGINAL_KEY, buffer, "image/jpeg");

  const resized200 = await sharp(buffer)
    .resize(200, 200, { fit: "cover" })
    .jpeg({ quality: 90 })
    .toBuffer();

  const resized400 = await sharp(buffer)
    .resize(400, 400, { fit: "cover" })
    .jpeg({ quality: 90 })
    .toBuffer();

  const [thumb200Url, thumb400Url] = await Promise.all([
    uploadToS3(RESIZED_KEY_200, resized200, "image/jpeg"),
    uploadToS3(RESIZED_KEY_400, resized400, "image/jpeg"),
  ]);

  return {
    bucket: BUCKET,
    original: originalUrl,
    resized200: thumb200Url,
    resized400: thumb400Url,
    message: "Image uploaded and cropped to 200px and 400px successfully.",
  };
};
