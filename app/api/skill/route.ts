import { NextResponse } from "next/server";
import Data from "./skill-data.json";
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(Data);
}
