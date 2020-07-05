import React, { useState } from 'react';

type Props = {onClick:(name:string)=>void};

export default function AddTaskButton({onClick}:Props) {

  const [editing, SetEditMode] = useState(false);
  const EditClicked = () => SetEditMode(true);

  let taskInputRef:HTMLInputElement | null;
 
  const OkClicked = () => {
    if(taskInputRef && taskInputRef.value){
      SetEditMode(false);
      onClick(taskInputRef.value);
    }
  }

  return (
    <div className="AddTaskButton">
      {
        editing ?
        <div>
          <input 
            className="TaskInput"
            placeholder="A name for this task"
            autoFocus={true}
            ref={element => taskInputRef = element}
            type="text"
            />
          <button onClick={OkClicked}>OK</button>
        </div>
        :
        <button onClick={EditClicked} >Add Task</button>
      }
    </div>
  );
}
 