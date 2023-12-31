import AWS from 'aws-sdk';

const s3 = new AWS.S3();

const s3Upload = async (file, folder) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folder}/${file.originalname}`,
    Body: file.buffer,
  };

  const data = await s3.upload(params).promise();
  return data.Key;
};

const s3Delete = async (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  await s3.deleteObject(params).promise();
};

export default {
  s3Upload,
  s3Delete,
};
