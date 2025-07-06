import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function GET() {
  const areas = await prisma.area.findMany({ where: { is_active: true } });
  return NextResponse.json(areas);
}
