const AWS = require('aws-sdk');
// const config = require('config');

const dotenv = require('dotenv');

dotenv.config();

const options = {
  // accessKeyId: config.get('aws').accessKeyId,
  // secretAccessKey: config.get('aws').secretAccessKey,
  // accessKeyId: config.get('aws.accessKeyId'),
  // secretAccessKey: config.get('aws.secretAccessKey'),
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucketName: process.env.AWS_BUCKET_NAME,
};

AWS.config.update(options);

module.exports = AWS;
