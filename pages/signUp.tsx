import {useState} from "react";
import {useRouter} from 'next/router'
import Link from "next/link";


export default function SignIn() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch("/api/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password, userName, displayName}),
        });

        if (response.ok) {
            router.push('/signIn')
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
                    <label htmlFor="email">UserName</label>
                    <input className={"text-white px-4 py-2 border-2 border-white rounded-lg bg-transparent"}
                           required={true}
                           placeholder={"JoeMama69"}
                           type="text" id="email" value={userName}
                           onChange={(e) => setUserName(e.target.value)}/>
                </div>
                <div className={"flex flex-col gap-2"}>
                    <label htmlFor="email">Display Name</label>
                    <input className={"text-white px-4 py-2 border-2 border-white rounded-lg bg-transparent"}
                           required={true}
                           placeholder={"Ben Dover"}
                           type="text" id="email" value={displayName}
                           onChange={(e) => setDisplayName(e.target.value)}/>
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
                    <button className={"text-white px-4 py-2 border-2 border-white rounded-lg bg-transparent"}>Sign Up
                    </button>
                    <Link href={"/signIn"}
                          className={"text-white px-4 py-2 border-2 border-white rounded-lg bg-transparent"}>Sign In
                    </Link>
                </div>
            </form>
            {error ? (<div>
                <p className={"text-red-500"}>{error}</p>
            </div>) : null}
        </div>
    )
}