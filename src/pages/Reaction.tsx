import React, {useCallback, useState} from 'react';
import './Reaction.css'
import football from '../assets/football.svg'
import InputNumber from "../components/InputNumber";
import classnames from 'classnames'
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

function Reaction() {
    const [reactionTimer, setReactionTimer] = useState(3);
    const [repetitions, setRepetitions] = useState(1);

    const [launched, setLaunched] = useState(false)
    const [playing, setPlaying] = useState(false)

    const moveBall = useCallback(async () => {
        const reaction = getRandomFromOneTo(reactionTimer)
        await waitFor(reaction)

        hikeAudio.play()
        await setLaunched(true)

        await waitFor(700)
        setLaunched(false)

    }, [ reactionTimer])

    const startInterval = useCallback(async () => {
        setPlaying(true)

        for (let i = 0; i < repetitions; i++){
            setAudio.play()
            await waitFor(200)

            await moveBall()
        }

        setPlaying(false)
    }, [repetitions])

  return (
    <div className="reaction">
      <img className={classnames(["ball", { 'up': launched, "show": playing }])} src={football} />
      <div className={classnames("reaction__overlay", { "hide": playing })}>
          <div className="reaction_overlay__menu">
              <h2>Reaction Range</h2>
              <InputNumber min={1} max={10} value={reactionTimer} onChange={setReactionTimer} />

              <h2>Repetitions</h2>
              <InputNumber min={1} max={100} value={repetitions} onChange={setRepetitions} />

          </div>
          <button className="reaction__button" onClick={startInterval}>Start</button>
      </div>
    </div>
  );
}

export default Reaction;
