'use client'

import { useCameraInfo, getPermissionStatus, getCamera, useAudioInfo } from "@/hooks/Camera";
import { useState, useEffect } from "react";
import VideoInfo from "@/components/VideoInfo";
import Title from "@/components/Title";
import AudioInfo from "@/components/AudioInfo";
import Camera from "@/components/Camera";

export default function Home() {
  const [permissionStatus, setPermissionStatus] = useState<PermissionState | null>(null)
  const [video, setVideo] = useState<MediaStream | undefined>()
  const [counter, setCounter] = useState(0)
  const cameraInfo = useCameraInfo()
  const audioInfo = useAudioInfo()

  const onPermissionAsk = () => {
    setCounter(counter + 1)
  }

  useEffect(
    () => {
      const asyncRequest = async () => {
        try {
          const camera = await getCamera()
          setVideo(camera)
          const persmission = await getPermissionStatus()
          setPermissionStatus(persmission)
        } catch (err) {
          console.log('error: ', err)
          if (typeof err === 'object' || err instanceof Object)
            if (err !== null && 'message' in err) {
              console.log('message is ', typeof err.message)
              const errMsg = err.message
              if (typeof errMsg === 'string' || errMsg instanceof String) {
                if (errMsg.includes('Permission denied')) {
                  console.log('denied: ')
                  setPermissionStatus('denied')
                } else if (errMsg.includes('Permission dismissed')) {
                  console.log('prompt: ')
                  setPermissionStatus('prompt')
                }
              }
            }
        }
      }
      asyncRequest()
    }, [counter]
  )

  return (
    <main
      className="font-[family-name:var(--font-main)] bg-main min-h-full min-w-full text-main"
    >
      <div className="flex flex-col px-2 gap-5 w-full">
        <Title
          className={"py-3 self-center"}
        />
        <div
          className="flex flex-row w-full items-stretch justify-center justify-items-center gap-8 "
        >
          <VideoInfo className='w-1/4' cameraInfo={cameraInfo} />
          <Camera
            className={"max-w-1/2 min-w-1/2"}
            src={video}
            permission={permissionStatus}
            onPersmissionAsk={onPermissionAsk}
          />
          <AudioInfo className="w-1/4" audioInfo={audioInfo} />
        </div>
      </div>
    </main>
  );
}
