import React, { useEffect, useState } from 'react'
import { ITask } from '../App'
import * as Timer from 'tiny-timer';
import { FormatDuration } from '../utils/Formatting';
import { Paper, IconButton } from '@material-ui/core';
import SVGPlay from '../assets/play.svg';
import SVGStop from '../assets/stop.svg';
import StarCounter from './StarCounter';

type Props = {task:ITask, toggleActive:(id:string, totalTime:number)=>void, deleteTask:(id:string)=>void, taskComplete:(id:string)=>void};

export default function Task({task, toggleActive, deleteTask, taskComplete}:Props) {

    const [timer] = useState(new Timer.default({ interval: 1000 }));
    const [totalTime, SetTotalTime] = useState<number>(0);

    const stars = (totalTime / 1000 / 60 / 15) | 0;

    const onTimerTick = (ms:number)=> {
        SetTotalTime(prevTotalTime => prevTotalTime + (ms > 0 ? 1000 : 0));
    }

    const onTimerComplete = ()=> {
        toggleActive(task.id, totalTime);
        taskComplete(task.id);
    }

    useEffect(()=> {
        timer.on('tick', onTimerTick);
        timer.on('done', onTimerComplete);

        SetTotalTime(task.totalTime || 0);

        return ()=> {
            timer.off('tick', onTimerTick);
        }
    },[])

    if(!task.active){
        timer.stop();
    } else if(timer.status === "stopped"){
        timer.start(15 * 60 * 1000);
    }

    return (  
        <Paper className="Task" elevation={2}>
            <button className="TaskClose" onClick={()=>deleteTask(task.id)}>X</button>
            <label>{task.taskName}</label>
            <IconButton className="TaskControls" onClick={()=>toggleActive(task.id, totalTime)}  >
                {task.active ? <img src={SVGStop} alt="stop"/> : <img src={SVGPlay} alt="start"/>}
            </IconButton>
            <span className="CurrentTime"> {timer.time > 0 ? FormatDuration(timer.time) : ""} </span>
            <span className="TotalTime"> {FormatDuration(totalTime)}</span>
            <StarCounter starCount={stars} />
        </Paper>
    )
}
