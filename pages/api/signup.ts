import type {NextApiRequest, NextApiResponse} from 'next'
import Prisma from "@/utils/prisma";


type Data = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {
        email: _email,
        password: _password,
        userName: _userName,
        displayName: _displayName,
    } = req.body;

    try {
        const checkUser = await Prisma.getInstance().user.findUnique({
            where: {
                email: _email
            }
        })

        if (checkUser) {
            return res.status(400).send({message: "User already exists"})
        }

        const user = await Prisma.getInstance().user.create({
            data: {
                email: _email,
                password: _password,
                userName: _userName,
                displayName: _displayName,

            }
        })
        return res.status(200).send({message: "User created successfully"})
    } catch (e) {
        res.status(500).send({message: "Something went wrong"})
    }
}
