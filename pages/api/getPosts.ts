import {NextApiRequest, NextApiResponse} from "next";
import Prisma from "@/utils/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const response = await Prisma.getInstance().post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        id: true,
                        displayName: true,
                        userName: true,
                    }
                }
            }
        });
        const posts = response;
        res.status(200).json(posts.reverse());
    } catch (e) {
        res.status(500).json({error: e})
    }
}