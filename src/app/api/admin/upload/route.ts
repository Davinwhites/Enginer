import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { cookies } from "next/headers";
import { uploadToCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session.isLoggedIn) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            return NextResponse.json({
                message: "Server Configuration Error",
                details: "Cloudinary environment variables are missing on the server. Please add them to Render environments."
            }, { status: 500 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({
                message: "No file selected",
                details: "The request reached the server but no file was found in the form data."
            }, { status: 400 });
        }

        console.log(`Processing upload: ${file.name}, Type: ${file.type}, Size: ${file.size}`);

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const result = await uploadToCloudinary(buffer, file.name);

        return NextResponse.json({ url: result.url });
    } catch (error: any) {
        console.error("Detailed upload error:", error);
        return NextResponse.json({
            message: "Upload failed",
            details: error.message || String(error)
        }, { status: 500 });
    }
}
