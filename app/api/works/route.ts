import { NextResponse } from "next/server";
import { getWorks } from "@/lib/works";

export const revalidate = 3600;

export async function GET() {
    return NextResponse.json(await getWorks());
}
