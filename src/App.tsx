import './App.css';
import { v4 as uuidV4 } from 'uuid';
import React, { useState } from 'react';
import AddTaskButton from './componenets/AddTaskButton';
import TaskList from './componenets/TaskList';
import useSound from 'use-sound';
import SVGIcon from './assets/icon.svg';

export interface ITask {
  id:string;
  taskName:string;
  active:boolean;
}

export default function App() {
  const [taskList, SetTask] = useState<ITask[]>([]);

  const [playDoneSound] = useSound(process.env.PUBLIC_URL + '/ding.mp3');

  const addTask = (taskName:string) => {
    const newTask = {
      id:uuidV4(),
      taskName,
      active:false,
      paused:false
    };
    SetTask(prevTasklist => [...prevTasklist, newTask]);
  }

  const toggleActive = (id:string) => {
      taskList.forEach(task => {
        if(task.id === id){
          task.active = !task.active;
        } else {
          task.active = false;
        }
      });
      SetTask([...taskList]);
  }

  const taskComplete = (id:string) => {
    playDoneSound();
  }

  const deleteTask = (id:string) => {
    SetTask(taskList.filter(task => task.id !== id));
  }

  return (
      <div>
        <div className="App-header" ><img src={SVGIcon} alt="logo"/><span>15 MINUTE SPRINT</span></div>
        <TaskList taskList={taskList} toggleActive={toggleActive} deleteTask={deleteTask} taskComplete={taskComplete} />
        <AddTaskButton onClick={addTask} />
      </div>
  );
}
