import React, { useState, useEffect } from 'react';

export const Watch = () => {
    const [time, setTime] = useState({
        hours: '',
        minutes: '',
        seconds: '',
    })

    const getTime = () => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        setTime({
            hours,
            minutes,
            seconds,
        })
    }

    useEffect(()=>{
        const timer = setTimeout(getTime, 1000);
        return () => {
            clearTimeout(timer);
        }
    })

    return (
        <div className='Watch'>{`${time.hours} : ${time.minutes} : ${time.seconds}`}</div>
    )
}
