import {NextApiRequest, NextApiResponse} from "next";
import Prisma from "@/utils/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const {authorization: userId} = req.headers;
        if (!userId) {
            return res.status(401).send({error: "Must be logged in to create a post"});
        }

        const {title: _title, content: _content} = req.body;
        if (!_title || !_content || !_title.trim() || !_content.trim()) {
            return res
                .status(400)
                .send({error: "Provide both title and content for the post"});
        }

        // Assuming Prisma.getInstance() returns a valid Prisma client instance
        const prisma = Prisma.getInstance();
        await prisma.post.create({
            data: {
                title: _title,
                content: _content,
                authorId: String(userId),
            },
        });

        res.status(200).send({message: "Post created successfully!"});
    } catch (e) {
        console.error("Error creating post:", e);
        res.status(500).json({error: "Failed to create the post"});
    }
}
