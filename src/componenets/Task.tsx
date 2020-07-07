import React, { useEffect, useState, useRef } from 'react'
import { ITask } from '../App'
import * as Timer from 'tiny-timer';
import { FormatDuration } from '../utils/Formatting';
import { Paper, IconButton } from '@material-ui/core';
import SVGPlay from '../assets/play.svg';
import SVGStop from '../assets/stop.svg';
import StarCounter from './StarCounter';

type Props = {task:ITask, toggleActive:(id:string)=>void, deleteTask:(id:string)=>void, taskComplete:(id:string)=>void};

const DURATION = 15 * 60 * 1000;

export default function Task({task, toggleActive, deleteTask, taskComplete}:Props) {

    const timer = useRef(new Timer.default({ interval: 1000 }));
    const [currentTime, SetCurrentTime] = useState(0);
    
    let startTotal = useRef<number | undefined>(0);

    const stars = (task.totalTime / DURATION) | 0;

    const onTimerTick = (ms:number)=> {
        task.totalTime = (startTotal.current || 0) + DURATION - timer.current.time;
        SetCurrentTime(ms);
    }

    const onTimerComplete = ()=> {
        toggleActive(task.id);
        taskComplete(task.id);
    }

    useEffect(()=> {
        timer.current.on('tick', onTimerTick);
        timer.current.on('done', onTimerComplete);

        task.totalTime = task.totalTime || 0;

        return ()=> {
            timer.current.off('tick', onTimerTick);
        }
    },[])

    if(!task.active){
        timer.current.stop();
    } else if(timer.current.status === "stopped"){
        timer.current.start(DURATION);
        startTotal.current = task.totalTime;
    }

    return (  
        <Paper className="Task" elevation={2}>
            <button className="TaskClose" onClick={()=>deleteTask(task.id)}>X</button>
            <label>{task.taskName}</label>
            <IconButton className="TaskControls" onClick={()=>toggleActive(task.id)}  >
                {task.active ? <img src={SVGStop} alt="stop"/> : <img src={SVGPlay} alt="start"/>}
            </IconButton>
            <span className="CurrentTime"> {currentTime > 0 ? FormatDuration(currentTime) : ""} </span>
            <span className="TotalTime"> {FormatDuration(task.totalTime)}</span>
            <StarCounter starCount={stars} />
        </Paper>
    )
}
