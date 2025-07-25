import { prisma } from "@/utils/db";
import { getUserByClerkID } from "@/utils/auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { analyzeEntry } from "@/utils/ai";

export const POST = async () => {
    const user = await getUserByClerkID();
    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: "Write your message here...",
        },
    })

    const analysis = await analyzeEntry(entry.content);
    await prisma.analysis.create({
        data: {
            entryId: entry.id,
            ...analysis
        },
    })

    revalidatePath('/journal')

    return NextResponse.json({ data: entry });
}