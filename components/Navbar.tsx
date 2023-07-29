import Link from "next/link";
import QuilPen from "remixicon-react/QuillPenFillIcon"
import Home from "remixicon-react/Home2FillIcon"
import Sun from "remixicon-react/SunFillIcon"
import LogOut from "remixicon-react/LogoutCircleLineIcon"
import {destroyCookie} from "nookies";
import { useRouter } from 'next/navigation'

export default function Navbar() {
        const router = useRouter()
    const handleLogout = async () => {
        destroyCookie(null, 'token')
        router.push("/signIn")
    }
    return (
        <div className={"w-full h-[90px] border-b-[1px] border-white flex justify-between items-center p-4 lg:p-8"}>
            <div>
                <h1 className={"text-4xl font-bold"}>Y</h1>
            </div>
            <div className={"flex gap-10"}>
                <Link
                    href={"/"}>
                    <Home/>
                </Link>
                <Link
                    href={"/post"}>
                    <QuilPen/>
                </Link>
                <Link
                    href={"/lightMode"}>
                    <Sun/>
                </Link>
                <div className={"cursor-pointer hover:text-red-700 duration-300"} onClick={handleLogout}>
                    <LogOut/>
                </div>
            </div>
        </div>
    )
}