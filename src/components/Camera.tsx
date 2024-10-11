
import { useEffect, useRef } from "react";

export default function Camera(
    {
        className = "",
        src,
        permission,
        onPersmissionAsk
    }: {
        className?: string,
        src: MediaStream | undefined,
        permission: PermissionState | null,
        onPersmissionAsk: () => void

    }
) {
    const videoRef = useRef(null);

    useEffect(() => {
        console.log('use effect start')
        console.log('src = ', src, ' ref = ', videoRef)
        if (src === null) return
        if (videoRef === null) return
        /* eslint-disable */
        const currRef: any = videoRef.current
        /* eslint-enable */
        if (currRef === null) return
        if ('srcObject' in currRef) {
            currRef.srcObject = src
        }
        console.log('use effect end')
    }, [src, videoRef])

    const hasVideo = permission === 'granted'

    const noPermissionLine = () => {
        // const space = '\xa0'.repeat(40)
        return (
            <div className="mb-6 w-full relative h-fit self-end">
                <div className={`cursor-pointer`} onClick={onPersmissionAsk}>
                    <div className="bg-black opacity-65 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto w-fit">
                        <svg viewBox="0 0 24 24" className="text-warning w-fit h-5 sm:w-5 sm:h-5 mr-3">
                            <path fill="currentColor"
                                d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z">
                            </path>
                        </svg>
                        <span className="text-warning">
                            Ask Permission
                        </span>
                    </div>
                </div>
                <div className="w-1/2 h-fit bg-black opacity-65 relative">
                    {/* <div className="bg-permission-line relative w-1/2 h-fit self-end uppercase">
                        <Marquee
                            className="text-warning relative w-1/2 h-fit translate-y-1"
                            speed={25}
                            loop={0}
                            play>
                            Attention !{space}Attention ! {space}Permission is not granted !
                        </Marquee>
                    </div> */}
                </div>
            </div>
        )
    }

    const permissionBlockedLine = () => {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full uppercase">
                <div className="w-fit h-fit relative flex">
                    <div className="cross w-1/3 h-1/3" />
                </div>
                <p className="text-error">
                    Permission denied
                </p>
            </div>
        )
    }

    const noVideo = () => {
        const infoLine = permission == 'denied' ? permissionBlockedLine() : noPermissionLine()
        return (
            <div className="bg-no-signal w-full h-full flex">
                {infoLine}
            </div>
        )
    }

    return (
        <div
            className={`${className} aspect-video w-full`}
        >

            {hasVideo ?
                <video
                    className="w-full"
                    ref={videoRef}
                    autoPlay
                /> : noVideo()}
        </div>
    );
}
