import Link from "next/link";

export default function Footer() {
    return (
        <div className={"w-full p-4 border-t-[1px] border-[#909099] flex flex-col justify-center items-center"}>
            <h1 className={"text-[#909099]"}>Made with 💖 by <span><Link className={"font-sans text-blue-500"}
                                                                        target={"_blank"}
                                                                        href={"https://github.com/YARE0909"}>YARE0909</Link></span>
            </h1>
            <h1 className={"text-[#909099]"}>⭐ this <span><Link className={"font-sans text-blue-500"}
                                                                target={"_blank"}
                                                                href={"https://github.com/YARE0909/kzilla-internal-hackathon"}>repo :)</Link></span>
            </h1>
        </div>
    )
}