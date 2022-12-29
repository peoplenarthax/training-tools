import {useCallback, useState} from "react";
import {useAudios} from "./audio-player";

const waitFor = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

const getRandomFromOneTo = (max: number) => {
    return Math.floor((Math.random() * max) * 1000)
}

class ReactionController {
    stop: boolean = true

    pause() {
        this.stop = true
    }

    start() {
        this.stop = false
    }
}

export const useReactionTimer = () => {
    const reactionController = new ReactionController()
    const {play, muted, switchMute} = useAudios()
    const [reactionTimer, setReactionTimer] = useState(3);
    const [repetitions, setRepetitions] = useState(1);

    const [launched, setLaunched] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [stopFx, setStopFx] = useState(() => () => {
    })
    const moveBall = useCallback(async () => {
        const reaction = getRandomFromOneTo(reactionTimer)
        await waitFor(reaction)

        play('hike')
        await setLaunched(true)

        await waitFor(500)
        setLaunched(false)

    }, [reactionTimer, play])

    const startInterval = useCallback(() => {

        return new Promise(async (resolve, reject) => {
            setPlaying(true)
            reactionController.start()

            await setStopFx(() => () => {
                reactionController.pause()
                reject()
            })

            for (let i = 0; i < repetitions; i++) {
                if (reactionController.stop) break
                play('set')
                await waitFor(200)

                await moveBall()
            }
            setPlaying(false)
            setLaunched(false)
        })
            .catch(() => {
            })
            .finally(() => {
                setPlaying(false)
                setLaunched(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [repetitions, moveBall, play])

    return {
        reactionTimer,
        setReactionTimer,
        repetitions,
        setRepetitions,
        launched,
        playing,
        startInterval,
        stopInterval: stopFx,
        muted,
        switchMute
    }
}