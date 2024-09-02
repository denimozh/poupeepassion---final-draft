import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
    try {
        const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

        const pageSize = 10;

        const { user } = await validateRequest();

        if (!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const notifications = await prisma.notification.findMany({
            where: {
                recipentId: user.id
            },
        })
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Internal server error" }, { status: 500 })
    }
}