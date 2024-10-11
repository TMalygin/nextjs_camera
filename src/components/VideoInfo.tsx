import { CameraInfo } from "@/hooks/Camera"
import InfoBlock from "./InfoBlock"

export default function VideoInfo(
    {
        className = "",
        cameraInfo
    }: {
        className?: string,
        cameraInfo: CameraInfo | undefined
    }

) {
    const title = cameraInfo ? "Name: " + cameraInfo.title : ""
    const id = cameraInfo ? 'Id: ' + cameraInfo.id : ""
    return (
        <InfoBlock
            title={"Video"}
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