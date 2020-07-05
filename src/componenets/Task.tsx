import React, { useEffect, useState } from 'react'
import { ITask } from '../App'
import * as Timer from 'tiny-timer';
import { FormatDuration } from '../utils/Formatting';

type Props = {task:ITask, toggleActive:(id:string)=>void, deleteTask:(id:string)=>void, taskComplete:(id:string)=>void};

export default function Task({task, toggleActive, deleteTask, taskComplete}:Props) {

    const [timer] = useState(new Timer.default({ interval: 1000 }));
    const [totalTime, SetTotalTime] = useState<number>(0);

    const onTimerTick = (ms:number)=> {
        SetTotalTime(prevTotalTime => prevTotalTime + (ms > 0 ? 1000 : 0));
    }

    const onTimerComplete = ()=> {
        toggleActive(task.id);
        taskComplete(task.id);
    }

    useEffect(()=> {
        timer.on('tick', onTimerTick);
        timer.on('done', onTimerComplete);

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
        <div className="Task">
            <button className="TaskClose" onClick={()=>deleteTask(task.id)}>X</button>
            <label>{task.taskName}</label>
            <br/>
            <input type="checkbox" checked={task.active} onChange={()=>toggleActive(task.id)} />
            {task.active ? "Stop" : "Start"}
            <span className="CurrentTime"> {FormatDuration(timer.time)} </span>
            <span className="TotalTime"> {FormatDuration(totalTime)}</span>
        </div>
    )
}
