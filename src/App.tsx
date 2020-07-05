import './App.css';
import { v4 as uuidV4 } from 'uuid';
import React, { useState } from 'react';
import AddTaskButton from './componenets/AddTaskButton';
import TaskList from './componenets/TaskList';
import useSound from 'use-sound';

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
      const task = taskList.find(task => task.id === id);
      if(task) {
        task.active = !task.active;
      }
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
        <div className="App-header" >TASK TIMER</div>
        <TaskList taskList={taskList} toggleActive={toggleActive} deleteTask={deleteTask} taskComplete={taskComplete} />
        <AddTaskButton onClick={addTask} />
      </div>
  );
}
