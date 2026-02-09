export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.isLoggedIn) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const admin = await prisma.admin.findUnique({ where: { id: 1 } });
    return NextResponse.json({ username: admin?.username });
}

export async function PUT(req: NextRequest) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.isLoggedIn) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const { username, password } = await req.json();

        const updateData: any = { username };
        if (password && password.trim() !== "") {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await prisma.admin.update({
            where: { id: 1 },
            data: updateData,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ message: "Failed to update settings" }, { status: 500 });
    }
}
