import { signOut } from "@/auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest){
    await signOut()
    return NextResponse.json({ message: 'sign out'})
}