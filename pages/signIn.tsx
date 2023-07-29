import {useState} from "react";
import {setCookie} from "nookies";
import {useRouter} from 'next/router'
import Link from "next/link";


export default function SignIn() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch("/api/signin", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        });

        if (response.ok) {
            const {token} = await response.json();
            if (token) {
                setCookie(null, 'token', token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                })
                router.push('/')
            }

        } else {
            setError("Invalid Credentials");
        }
    }

    return (
        <div className={"w-full min-h-screen h-fit flex flex-col gap-5 items-center justify-center"}>
            <div>
                <h1 className={"text-5xl"}>Welcome Back</h1>
            </div>
            <form className={"w-1/4 p-4 rounded-lg border-white border-2 flex flex-col gap-5"} onSubmit={handleSubmit}>
                <div className={"flex flex-col gap-2"}>
                    <label htmlFor="email">Email</label>
                    <input className={"text-white px-4 py-2 border-2 border-white rounded-lg bg-transparent"}
                           required={true}
                           placeholder={"funnyguy69@gmail.com"}
                           type="email" id="email" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={"flex flex-col gap-2"}>
                    <label htmlFor="password">Password</label>
                    <input className={"text-white px-4 py-2 border-2 border-white rounded-lg bg-transparent"}
                           required={true}
                           type="password" id="password" value={password}
                           placeholder={"********"}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={"flex gap-2"}>
                    <button className={"text-white px-4 py-2 border-2 border-white rounded-lg bg-transparent"}>Sign In
                    </button>
                    <Link href={"/signUp"}
                          className={"text-white px-4 py-2 border-2 border-white rounded-lg bg-transparent"}>Sign Up
                    </Link>
                </div>
            </form>
            {error ? (<div>
                <p className={"text-red-500"}>{error}</p>
            </div>) : null}
        </div>
    )
}