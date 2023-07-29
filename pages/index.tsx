import {GetServerSideProps} from "next";
import nookies from 'nookies'
import Navbar from "@/components/Navbar";

export default function Home({user, posts}: any) {
    console.log(posts);
    return (
        //   TODO: Add home page
        <div className={"w-full min-h-screen h-fit flex flex-col"}>
            <div>
                <Navbar/>
            </div>
            <div className={"p-8 flex flex-col gap-5"}>
                <div className={"flex flex-col gap-2"}>
                    <h1 className={"text-5xl font-bold"}>Hello {user.displayName}</h1>
                    <h1 className={"text-[#909099]"}>Here are some dank tYeets</h1>
                </div>
                <div>
                    {posts ? posts.reverse().map((post: any) => {
                        return (
                            <div key={post.id}
                                 className={"p-4 border-b border-[#2f3336] my-2 flex flex-col gap-2"}>
                                <div className={"flex flex-col"}>
                                    <h1 className={"text-xl font-bold"}>{post.author.displayName}</h1>
                                    <h1 className={"text-xs text-[#71767b]"}>@{post.author.userName}</h1>
                                </div>
                                <h1 className={"text-xl font-bold"}>{post.title}</h1>
                                <p>{post.content}</p>
                            </div>
                        )
                    }) : (
                        <div className={"w-full h-full flex items-center justify-center"}>
                            <h1 className={"text-xl text-[#909099] font-bold"}>No posts found :(</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// TODO: Implement getServerSideProps

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = nookies.get(ctx)
    if (!cookies.token) {
        return {
            redirect: {
                destination: '/signIn',
                permanent: false
            }
        }
    }
    // Fetch user data from /api/getUserData
    const userResponse = await fetch("http://localhost:3000/api/getUserData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "userId": cookies.token
            }
        }
    )

    const postsResponse = await fetch("http://localhost:3000/api/getPosts", {
        method: "POST",
    })

    return {
        props: {
            user: await userResponse.json(),
            posts: await postsResponse.json()
        }
    }

}