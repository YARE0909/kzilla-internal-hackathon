import {NextApiRequest, NextApiResponse} from "next";
import Prisma from "@/utils/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {authorization: userId} = req.headers;
    if (!userId) {
        return res.status(401).send({error: "Provide a userId"});
    }
    try {
        const response = await Prisma.getInstance().user.findUnique({
            where: {
                id: userId
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
        res.status(500).json({error: e})
    }

}