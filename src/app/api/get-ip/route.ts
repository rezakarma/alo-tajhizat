import { NextRequest, NextResponse } from 'next/server';

export async function GET(request:NextRequest) {
    // const userIP = await getClientIp(request);
    // res.status(200).json({ userIP });


  //   const ipHeader =await request.headers.get('x-forwarded-for');
  // const userIP = ipHeader ? ipHeader.split(',')[0].trim() : request.ip;

    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const userIP = data.ip;


    // const userIP =await request.connection.remoteAddress;
    return NextResponse.json({success: true, userIP: userIP , status: 200})
  }



