import {useRouter} from "next/router";
import {useState} from "react";
import {parseCookies} from "nookies";
import Navbar from "@/components/Navbar";

export default function Post() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleKeyDown = (e: any) => {
        // Reset field height
        e.target.style.height = 'inherit';

        // Get the computed styles for the element
        const computed = window.getComputedStyle(e.target);

        // Calculate the height
        const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
            + parseInt(computed.getPropertyValue('padding-top'), 10)
            + e.target.scrollHeight
            + parseInt(computed.getPropertyValue('padding-bottom'), 10)
            + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

        e.target.style.height = `${height}px`;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cookies = parseCookies()

        const response = await fetch("/api/createPosts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": cookies.token
            },
            body: JSON.stringify({title, content}),
        });
        if (response.ok) {
            router.push("/")
        }
    }
    return (
        <div className={"w-full min-h-screen h-fit flex flex-col"}>
            <div>
                <Navbar/>
            </div>
            <div className={"w-full h-full p-8 flex flex-col gap-10"}>
                <div className={"flex flex-col gap-2"}>
                    <h1 className={"text-4xl md:text-7xl font-semibold"}>Create a new post</h1>
                    <h1 className={"text-[#909099] md:ml-1"}>Say something dank to the world</h1>
                </div>
                <form className={"w-full md:w-1/2 flex flex-col gap-5"} onSubmit={handleSubmit}>
                    <div className={"flex flex-col gap-2"}>
                        <label htmlFor="title">Title</label>
                        <input
                            className={"text-white px-4 py-2 outline-0 bg-transparent"}
                            required={true}
                            placeholder={"Why did the chicken cross the road?"}
                            type="text" id="title" value={title}
                            onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <label htmlFor="content">Content</label>
                        <textarea
                            className={"text-white px-4 py-2 outline-0 bg-transparent w-full h-auto resize-none"}
                            required={true}
                            placeholder={"To get to the other side"}
                            id="content" value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className={"flex flex-col gap-2 absolute bottom-2 left-2 right-2"}>
                        <button className={"px-4 py-2 rounded-lg bg-white text-black font-semibold"}>Create
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}