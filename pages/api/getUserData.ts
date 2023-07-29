import {NextApiRequest, NextApiResponse} from "next";
import Prisma from "@/utils/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {userId} = req.headers;
    try {
        const response = await Prisma.getInstance().user.findFirst({
            where: {
                id: userId as string
            },
            select: {
                id: true,
                email: true,
                displayName: true,
                userName: true,
            }
        });
        res.status(200).json(response);
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e})
    }

}