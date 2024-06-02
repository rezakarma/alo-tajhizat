import { NextRequest, NextResponse } from "next/server";
import  schema  from "./schema";

export async function GET(request) {
  return NextResponse.json('hi');
}

export async function POST(request) {
  const body = await request.json();
  const validation = schema.safeParse(body)
  if(!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 })
  }
  return NextResponse.json(body)
}
