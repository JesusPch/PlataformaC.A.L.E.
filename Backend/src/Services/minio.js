const {
  GetObjectCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client
} = require('@aws-sdk/client-s3');

let client;

function getClient() {
  if (client) {
    return client;
  }

  const accessKey = process.env.MINIO_ACCESS_KEY;
  const secretKey = process.env.MINIO_SECRET_KEY;

  if (!accessKey || !secretKey) {
    throw new Error('Configura MINIO_ACCESS_KEY y MINIO_SECRET_KEY en Backend/.env.');
  }

  const port = Number(process.env.MINIO_PORT || 9000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('MINIO_PORT debe ser un puerto válido.');
  }

  const useSSL = process.env.MINIO_USE_SSL === 'true';
  const protocol = useSSL ? 'https' : 'http';

  client = new S3Client({
    region: process.env.MINIO_REGION || 'us-east-1',
    endpoint: `${protocol}://${process.env.MINIO_ENDPOINT || 'localhost'}:${port}`,
    forcePathStyle: true,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey
    }
  });

  return client;
}

async function uploadPdf(objectKey, buffer) {
  const bucketName = process.env.MINIO_BUCKET || 'pdf-registro';
  const s3Client = getClient();
  await s3Client.send(new HeadBucketCommand({ Bucket: bucketName }));
  await s3Client.send(new PutObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
    Body: buffer,
    ContentType: 'application/pdf'
  }));
}

async function downloadPdf(objectKey) {
  const bucketName = process.env.MINIO_BUCKET || 'pdf-registro';
  return getClient().send(new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey
  }));
}

module.exports = { uploadPdf, downloadPdf };
