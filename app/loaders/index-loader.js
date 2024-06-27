import { authenticate } from "../shopify.server";

export const indexLoader = async ({ request }) => {
    const { session, redirect, billing } = await authenticate.admin(request);
    return { session };
}