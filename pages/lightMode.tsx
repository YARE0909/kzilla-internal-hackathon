import Image from "next/image";

export default function LightMode() {
    return (
        <div className={"w-full min-h-screen h-fit overflow-hidden"}>
            <Image className={"w-full"} src={"/meme.jpg"} alt={"NO LIGHT MODE"}
                   width={100} height={100}/>
        </div>
    )
}