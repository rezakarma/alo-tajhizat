import { NextRequest, NextResponse } from "next/server";
import { notifications } from "@/schema/index";
import prisma from '../../../prisma/client' 

export async function GET(request:NextRequest){
    // const notification = await prisma.notifications.findMany();
    return NextResponse.json({notification: 'test'})
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = notifications.safeParse(body);
    if(!validation.success){
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const notification = await prisma.notifications.findUnique({
        where:{id:body.id}
    });

    if(!notification)
    return NextResponse.json({error:""},{status:400})

    const newNotifications = await prisma.notifications.create({
        data: {
           title:body.title,
           description:body.description,
           details:body.details,   
        }
    })

    return NextResponse.json(newNotifications, { status: 201}) 
}