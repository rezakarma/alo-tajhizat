import { NextRequest, NextResponse } from "next/server";
import { contactUsForm } from "@/schema/index";
import  prisma  from "@/prisma/client";


export async function GET(){
    
const contact= await prisma.contactUs.findMany();

    return NextResponse.json(contact)

}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = contactUsForm.safeParse(body);
    if(!validation.success){
        return NextResponse.json(validation.error.errors);
    }

    const contactUs = await prisma.contactUs.findUnique({
        where:{id:body.id}
    });

    if(!contactUs)
    return NextResponse.json({error:"contact invalid"})

    const newContactUs = await prisma.contactUs.create({
        data: {
           name:body.name,
           email:body.email,
           phoneNumber:body.number,
           description:body.description
            
        }
    })

    return NextResponse.json(newContactUs, { status: 201}) 
}

export async function DELETE(
    request:NextRequest,
    { params }: { params: { id: string } }){
        const contactUs =await prisma.contactUs.findUnique({
            where:{id: params.id}
        })
        if(!contactUs)
        return NextResponse.json({error:"contactUs not found"},{status:404})

        await prisma.contactUs.delete({
            where:{id: contactUs.id}
        })

        return NextResponse.json({})
}