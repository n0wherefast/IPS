import { NextResponse } from "next/server";
import {refForm} from './data';
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(refForm);
}