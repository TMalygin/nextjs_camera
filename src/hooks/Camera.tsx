import { useEffect, useState } from "react";

export type CameraStatus = {
    Error?: String,
    Info?: {}
}

function getPermission(): Permissions | null {
    if (navigator === undefined || navigator === null) {
        console.error('navigation is not found!')
        return null
    }
    var permissions = navigator.permissions
    if (permissions === undefined || permissions === null) {
        console.error('field permissions is not found!')
        return null
    }
    return permissions
}

export async function getPermissionStatus(): Promise<PermissionState | null> {
    var permissions = getPermission()
    var status = await permissions?.query({ name: "camera" })
    return status?.state ?? null
}

function mediaDevices(): MediaDevices | null {
    if (navigator === undefined || navigator === null) {
        console.error('navigation is not found!')
        return null;
    }
    var mediaDevices = navigator.mediaDevices
    if (mediaDevices === undefined || mediaDevices === null) {
        console.error('medaDevices are not found!')
        return null;
    }
    return mediaDevices
}

export async function getListOfCameras(): Promise<Array<MediaDeviceInfo>> {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === 'videoinput');
    return cameras;
}

export function useCamera(): MediaStream | undefined {
    var [camera, setCamera] = useState<MediaStream | undefined>(undefined)

    useEffect(() => {
        mediaDevices()?.getUserMedia(
            {
                'video': true
            }
        ).then((camera) => setCamera(camera))
            .catch((err) => {
                console.error(`can\'t get camera! ${err.name}: ${err.message}`);
            });
    }, [])

    return camera
}

export function getCamera(): Promise<MediaStream> | undefined {
    return mediaDevices()?.getUserMedia(
        {
            'video': true,
            'audio': true
        }
    )
}

export type CameraInfo = {
    title: String
    id: String
}

export type AudioInfo = {
    title: String
    id: String
}

export function useCameraInfo(): CameraInfo | undefined {
    var [cameraInfo, setCameraInfo] = useState<CameraInfo | undefined>(undefined)
    mediaDevices()?.enumerateDevices()
        .then((devices) => devices.find((info: MediaDeviceInfo) => info.kind === 'videoinput'))
        .then((device: MediaDeviceInfo | undefined) => {
            if (device !== undefined && device.label !== undefined && device.label !== '') {
                const camInfo: CameraInfo = {
                    title: device.label,
                    id: device.deviceId
                }
                setCameraInfo(camInfo)
            }

        })
    return cameraInfo
}

export function useAudioInfo(): AudioInfo | undefined {
    var [audioInfo, setAudioInfo] = useState<AudioInfo | undefined>(undefined)
    mediaDevices()?.enumerateDevices()
        .then((devices) => devices.find((info: MediaDeviceInfo) => info.kind === 'audioinput'))
        .then((device: MediaDeviceInfo | undefined) => {
            if (device !== undefined && device.label !== undefined && device.label !== '') {
                const camInfo: AudioInfo = {
                    title: device.label,
                    id: device.deviceId
                }
                setAudioInfo(camInfo)
            }

        })
    return audioInfo
}