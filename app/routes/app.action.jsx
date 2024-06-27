import { useEffect } from "react";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../shopify.server";


export const action = async ({ request }) => {


    const { session } = await authenticate.admin(request);
    const payload = await request.json();
    const shop = session.shop;
    
    // console.log("payload Action : ", payload.action);
    // console.log("prisma : ", prisma);
    // Retrieve all sessions from the database
    // const sessions = await prisma.session.findMany();

    const prisma = new PrismaClient();
    if (payload.action) {
        const action = payload.action;
        const payloadData = payload.data;
        if (action == 'create_settings') {
            // return payloadData;

            let storeSettingData = {
                shop: shop,
                settings: JSON.stringify(payloadData.settings)
            };

            const settingsCreatedStatus = await prisma.storeSettings.create({
                data: storeSettingData
            });

            return settingsCreatedStatus;
        } else if (action == 'get_settings') {
            const settings = await prisma.storeSettings.findMany();

            return settings;
        }
    }

    return {
        name: 'jay soni',
        sessions: sessions
    };
}