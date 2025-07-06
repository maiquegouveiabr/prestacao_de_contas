import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function GET() {
  const zones = await prisma.zone.findMany({ where: { is_zone_real: true } });
  return NextResponse.json(zones);
}
