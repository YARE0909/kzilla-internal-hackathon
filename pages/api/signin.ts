import type {NextApiRequest, NextApiResponse} from 'next'
import Prisma from "@/utils/prisma";

type Data = {
    message: string;
    token?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {email: _email, password: _password} = req.body;
    if (!_email || !_password) {
        return res.status(422).send({message: "Must provide credentials"});
    }
    try {
        const user = await Prisma.getInstance().user.findUnique({
            where: {
                email: _email,
            },
            select: {
                password: true,
                id: true,
            }
        });
        if (!user) {
            return res.status(404).send({message: "User not found"});
        }
        if (user.password !== _password) {
            return res.status(401).send({message: "Invalid credentials"});
        } else {
            return res.status(200).send({message: "Logged in successfully", token: user.id});
        }
    } catch (e) {
        res.status(500).send({message: "Something went wrong"})
    }
}
