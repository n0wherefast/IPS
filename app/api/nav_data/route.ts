import { NextResponse } from "next/server";
import {dataLink} from "./data";
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(dataLink);
}
