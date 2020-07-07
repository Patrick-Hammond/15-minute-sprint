import './App.css';
import { v4 as uuidV4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import AddTaskButton from './componenets/AddTaskButton';
import TaskList from './componenets/TaskList';
import useSound from 'use-sound';
import SVGIcon from './assets/icon.svg';

export interface ITask {
  id:string;
  taskName:string;
  active:boolean;
  totalTime:number;
}

const LOCAL_STORAGE_KEY = 'symbolshift.15minutesprint'

export default function App() {
  const [taskList, SetTasks] = useState<ITask[]>([]);

  const [playDoneSound] = useSound(process.env.PUBLIC_URL + '/ding.mp3');

  const onDestroy = (e:Event)=> {
    e.preventDefault();
  }

  useEffect(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) SetTasks(JSON.parse(storedTasks));
    window.addEventListener("beforeunload", onDestroy);

    return ()=> window.removeEventListener("beforeunload", onDestroy);
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskList));
  }, [taskList]);

  const addTask = (taskName:string) => {
    const newTask = {
      id:uuidV4(),
      taskName,
      active:false,
      totalTime:0
    };
    SetTasks([...taskList, newTask]);
  }

  const toggleActive = (id:string) => {
      const newTaskList = [...taskList];
      newTaskList.forEach(task => {
        if(task.id === id){
          task.active = !task.active;
        } else {
          task.active = false;
        }
      });
      SetTasks(newTaskList);
  }

  const taskComplete = (id:string) => {
    playDoneSound();
  }

  const deleteTask = (id:string) => {
    SetTasks(taskList.filter(task => task.id !== id));
  }

  return (
      <div>
        <div className="App-header" ><img src={SVGIcon} alt="logo"/><span>15 MINUTE SPRINT</span></div>
        <TaskList taskList={taskList} toggleActive={toggleActive} deleteTask={deleteTask} taskComplete={taskComplete} />
        <AddTaskButton onClick={addTask} />
      </div>
  );
}
