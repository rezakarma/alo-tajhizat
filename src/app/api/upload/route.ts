import { NextRequest, NextResponse } from "next/server";
import { S3 } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { user } from "@nextui-org/react";
const ACCESSKEY = process.env.LIARA_ACCESS_KEY;
const SECRETKEY = process.env.LIARA_SECRET_KEY;
const ENDPOINT = process.env.LIARA_ENDPOINT;
const BUCKET = process.env.LIARA_BUCKET_NAME;

export async function POST(request, response: NextResponse) {
  try {

    const body = await request.formData();
    const file = body.get("file");
    const folder = body.get("folder")
    const userName = body.get("userName")
    const existKey = body.get("existKey")
    
    if(!file){
      return NextResponse.json({error : 'فایلی وجود ندارد'})
    }
    
    const buffer = Buffer.from(await file.arrayBuffer());
    
    
    console.log(file ,'file',body, 'here')
    let uniqueKey;
    if(userName){
      if(folder === 'profile' || folder === "idCart"){
        uniqueKey = `${userName}-${folder}-${uuidv4()}`;
      }
    }else if(folder === 'product'){
      uniqueKey = `${folder}-${uuidv4()}`;
    }else if(existKey){
      uniqueKey = existKey
    } else {
      uniqueKey = `${uuidv4()}-${file.name}`;
    }
    const s3 = new S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
    });
    
    const params = {
      Bucket: BUCKET,
      Key: `${folder}/${uniqueKey}`,
      Body: buffer,
    };
    
    const result = await s3.upload(params).promise();
    
    return NextResponse.json({success: "true",result});
  }catch(error) {
    return NextResponse.json({error: error})
  }
  }
  