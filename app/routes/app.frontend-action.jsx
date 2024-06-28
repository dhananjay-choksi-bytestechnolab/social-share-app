import { PrismaClient } from "@prisma/client";

export const action = async ({ request }) => {
    const payload = await request.json();

    const prisma = new PrismaClient();
    if (payload.action) {
        const action = payload.action;
        const payloadData = payload.data;
        if (action == 'get_settings') {
            const settings = await prisma.storeSettings.findMany();

            return settings;
        }
    }
}