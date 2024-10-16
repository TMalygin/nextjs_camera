'use client'
import { useEffect, useState } from "react";

function getPermission(): Permissions | null {
    if (typeof window === 'undefined') {
        return null;
    }
    if (navigator === undefined || navigator === null) {
        console.error('navigation is not found!')
        return null
    }
    const permissions = navigator.permissions
    if (permissions === undefined || permissions === null) {
        console.error('field permissions is not found!')
        return null
    }
    return permissions
}

export async function getPermissionStatus(): Promise<PermissionState | null> {
    const permissions = getPermission()
    // @ts-expect-error camera is part of the PermissionDescriptor
    const status = await permissions?.query({ name: "camera" })
    return status?.state ?? null
}

function mediaDevices(): MediaDevices | null {
    if (typeof window === 'undefined') {
        return null
    }
    if (navigator === undefined || navigator === null) {
        console.error('navigation is not found!')
        return null;
    }
    const mediaDevices = navigator.mediaDevices
    if (mediaDevices === undefined || mediaDevices === null) {
        return null;
    }
    return mediaDevices
}

export async function getListOfCameras(): Promise<Array<MediaDeviceInfo>> {
    const devices = await mediaDevices()?.enumerateDevices();
    const cameras = devices?.filter((device) => device.kind === 'videoinput');
    return cameras ?? [];
}

export function useCamera(): MediaStream | undefined {
    const [camera, setCamera] = useState<MediaStream | undefined>(undefined)

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
    title: string
    id: string
}

export type AudioDeviceInfo = {
    title: string
    id: string
}

export function useCameraInfo(): CameraInfo | undefined {
    const [cameraInfo, setCameraInfo] = useState<CameraInfo | undefined>(undefined)
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

export function useAudioInfo(): AudioDeviceInfo | undefined {
    const [audioInfo, setAudioInfo] = useState<AudioDeviceInfo | undefined>(undefined)
    mediaDevices()?.enumerateDevices()
        .then((devices) => devices.find((info: MediaDeviceInfo) => info.kind === 'audioinput'))
        .then((device: MediaDeviceInfo | undefined) => {
            if (device !== undefined && device.label !== undefined && device.label !== '') {
                const camInfo: AudioDeviceInfo = {
                    title: device.label,
                    id: device.deviceId
                }
                setAudioInfo(camInfo)
            }

        })
    return audioInfo
}