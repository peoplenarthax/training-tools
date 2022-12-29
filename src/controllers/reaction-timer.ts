import {useCallback, useState} from "react";
import setSoundFile from '../assets/set.wav'
import hikeSoundFile from '../assets/hike.wav'

const setAudio = new Audio(setSoundFile);
const hikeAudio = new Audio(hikeSoundFile);

const waitFor = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

const getRandomFromOneTo = (max: number) => {
    return Math.floor((Math.random() * max + 1) * 1000)
}

class ReactionController {
    stop: boolean = true
    isSilenced: boolean = false

    sounds = {
        set: () => setAudio.play(),
        hike: () => hikeAudio.play()
    }

    switchSilence() {
        this.isSilenced = !this.isSilenced
    }

    pause() {
        this.stop = true
    }

    play(sound: 'set' | 'hike') {
        this.sounds[sound]()
    }

    start() {
        this.stop = false
    }
}

export const useReactionTimer = () => {
    const reactionController = new ReactionController()
    const [reactionTimer, setReactionTimer] = useState(3);
    const [repetitions, setRepetitions] = useState(1);

    const [launched, setLaunched] = useState(false)
    const [playing, setPlaying] = useState(false)

    const moveBall = useCallback(async () => {
        const reaction = getRandomFromOneTo(reactionTimer)
        await waitFor(reaction)

        reactionController.play('hike')
        await setLaunched(true)

        await waitFor(500)
        setLaunched(false)

    }, [reactionTimer])

    const startInterval = useCallback(async () => {
        debugger
        setPlaying(true)
        for (let i = 0; i < repetitions; i++) {
            reactionController.play('set')
            await waitFor(200)

            await moveBall()
        }

        setPlaying(false)
        setLaunched(false)

    }, [repetitions])

    return {
        reactionTimer,
        setReactionTimer,
        repetitions,
        setRepetitions,
        launched,
        setLaunched,
        playing,
        setPlaying,
        startInterval,
    }
}