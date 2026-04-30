const sharp = require("sharp");
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

//https://s3-image-lambda-demo.s3.ap-south-1.amazonaws.com/office.jpg
const BUCKET = process.env.S3_BUCKET;

console.log("Image service loaded...");
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

exports.uploadAndCrop = async (originalName, buffer) => {
    console.log("uploadAndCrop...");
    const ext = path.extname(originalName);       // ".jpg"
    const name = path.basename(originalName, ext); // "photo.profile.image"
    const originalUrl = await uploadToS3("original/" + name + ext, buffer, "image/jpeg");

    const resized200 = await sharp(buffer)
        .resize(200, 200, { fit: "cover" })
        .jpeg({ quality: 90 })
        .toBuffer();

    const resized400 = await sharp(buffer)
        .resize(400, 400, { fit: "cover" })
        .jpeg({ quality: 90 })
        .toBuffer();

    const [thumb200Url, thumb400Url] = await Promise.all([
        uploadToS3("resized/" + name + "_200.jpg", resized200, "image/jpeg"),
        uploadToS3("resized/" + name + "_400.jpg", resized400, "image/jpeg"),
    ]);

    return {
        bucket: BUCKET,
        original: originalUrl,
        resized200: thumb200Url,
        resized400: thumb400Url,
        message: "Image uploaded and cropped to 200px and 400px successfully.",
    };
};
