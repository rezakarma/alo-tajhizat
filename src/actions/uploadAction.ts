"use server"
import { S3 } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
const ACCESSKEY = process.env.LIARA_ACCESS_KEY;
const SECRETKEY = process.env.LIARA_SECRET_KEY;
const ENDPOINT = process.env.LIARA_ENDPOINT;
const BUCKET = process.env.LIARA_BUCKET_NAME;
export const uploadImage = async (file)=>{


  console.log(file , 'here')
  const uniqueKey = `${uuidv4()}-${file.name}`;
  const s3 = new S3({
    accessKeyId: ACCESSKEY,
    secretAccessKey: SECRETKEY,
    endpoint: ENDPOINT,
  });

  const params = {
    Bucket: BUCKET,
    Key: uniqueKey,
    Body: file,
  };

  const result = await s3.upload(params).promise();

  return result;
}