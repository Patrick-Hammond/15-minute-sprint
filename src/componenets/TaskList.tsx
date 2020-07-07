import React from 'react'
import Task from './Task'
import { ITask } from '../App';

type Props = {taskList:ITask[], toggleActive:(id:string)=>void, deleteTask:(id:string)=>void, taskComplete:(id:string)=>void};

export default function TaskList({taskList, toggleActive, deleteTask, taskComplete}:Props) {
    return (
        <div>
            {taskList.map(task => 
                <Task key={task.id} task={task} toggleActive={toggleActive} deleteTask={deleteTask} taskComplete={taskComplete} />
            )}
        </div>
    )
}
