import React from 'react';
import './Reaction.css'
import football from '../assets/football.svg'
import InputNumber from "../components/InputNumber";
import classnames from 'classnames'
import {useReactionTimer} from '../controllers/reaction-timer';


function Reaction() {
    const {
        reactionTimer,
        setReactionTimer,
        repetitions,
        setRepetitions,
        launched,
        playing,
        startInterval,
        stopInterval,
        switchMute,
        muted
    } = useReactionTimer()


    return (
        <div className="reaction">
            <img className={classnames(["ball", {'up': launched, "show": playing}])} src={football} alt="football player"/>
            <div className={classnames("reaction__overlay", {"hide": playing})}>
                <div className="reaction_overlay__menu">
                    <h2>Reaction Range</h2>
                    <InputNumber min={1} max={10} value={reactionTimer} onChange={setReactionTimer}/>

                    <h2>Repetitions</h2>
                    <InputNumber min={1} max={100} value={repetitions} onChange={setRepetitions}/>

                </div>
                <button className="reaction__button" onClick={startInterval}>Start</button>
            </div>
            <div className="reaction__controller">
                <button className="reaction__controller__button" onClick={stopInterval}>⏸</button>
                <button className="reaction__controller__button" onClick={switchMute}>{ muted ? '🔇' : '🔈' }</button>

            </div>
        </div>
    );
}

export default Reaction;
