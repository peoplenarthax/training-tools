import React, { useCallback } from 'react'
import "./InputNumber.css"

const InputNumber = ({ min, max, value, onChange}: any) => {

    const safeChange = (newValue: number) => {
        if (newValue > max || newValue < min) {
            return
        }
        onChange(newValue)
    }

    const changeValue = useCallback((delta: number) => () => {
        safeChange(value + delta)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <div className='input-number__wrapper'>
            <button className="input-number__button" onClick={changeValue(-1)}>&#8722;</button>
            <div className="input-number__value">{ value }</div>
            <button className="input-number__button" onClick={changeValue(1)}>&#43;</button>
        </div>
    )
}

export default InputNumber