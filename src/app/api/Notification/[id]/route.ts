import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
    const notification = await prisma.notifications.findUnique({
        where: {
            id: params.id
        }
    })

    if (!notification)
    return NextResponse.json({error: 'notification not found'}, {status:404})
return NextResponse.json(notification);

}