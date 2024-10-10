import { AudioInfo } from "@/hooks/Camera"
import InfoBlock from "./InfoBlock"

export default function AudioInfo(
    {
        className = "",
        audioInfo
    }: {
        className?: String,
        audioInfo: AudioInfo | undefined
    }

) {
    const title = audioInfo ? "Name: " + audioInfo.title : ""
    const id = audioInfo ? 'Id: ' + audioInfo.id : ""

    return (
        <InfoBlock
            title={"Audio"}
            className={`${className}`}
        >
            <div className="flex flex-col flex-wrap break-all" >
                {title}
                <br />
                {id}
            </div>
        </InfoBlock>
    )
}