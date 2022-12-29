import setSoundFile from '../assets/set.wav'
import hikeSoundFile from '../assets/hike.wav'
import {useCallback, useState } from 'react';

const setAudio = new Audio(setSoundFile);
const hikeAudio = new Audio(hikeSoundFile);

const sounds = {
    set: () => setAudio.play(),
    hike: () => hikeAudio.play()
}

export const useAudios = () => {
    const [ muted, setMuted ] = useState(false)

    const switchMute = useCallback(() => {
        setMuted(!muted)
    }, [muted])

    const play = useCallback((audio: keyof typeof sounds) => {
        if (muted) return

        sounds[audio]()
    }, [ muted ])

    return { muted, switchMute, play }
}