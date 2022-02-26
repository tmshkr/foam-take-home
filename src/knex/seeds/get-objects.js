require("dotenv").config();
const AWS = require("aws-sdk");

const {
  NEXT_PUBLIC_MY_AWS_REGION,
  NEXT_PUBLIC_MY_AWS_BUCKET,
  MY_AWS_ACCESS_KEY_ID,
  MY_AWS_SECRET_ACCESS_KEY,
} = process.env;

AWS.config.update({
  region: NEXT_PUBLIC_MY_AWS_REGION,
  accessKeyId: MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: MY_AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const getObjects = (continuationToken) =>
  new Promise((resolve, reject) => {
    const params = {
      Bucket: NEXT_PUBLIC_MY_AWS_BUCKET,
      MaxKeys: 500,
      ContinuationToken: continuationToken,
    };
    s3.listObjectsV2(params, function (err, data) {
      err ? reject(err) : resolve(data);
    });
  });

exports.seed = async function (knex) {
  const insertObjectKeys = async (continuationToken) => {
    const res = await getObjects(continuationToken);
    const objectKeys = res.Contents.map((item) => ({
      key: item.Key,
    }));

    await knex("images").insert(objectKeys);

    // Recursively call insertObjectKeys
    // until all objects from bucket have been inserted
    if (res.NextContinuationToken) {
      await insertObjectKeys(res.NextContinuationToken);
    }
  };

  return knex("images")
    .del()
    .then(async function () {
      // Inserts seed entries
      await insertObjectKeys();
    });
};
