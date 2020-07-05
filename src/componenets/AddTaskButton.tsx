import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

type Props = {onClick:(name:string)=>void};

export default function AddTaskButton({onClick}:Props) {

  const [editing, SetEditMode] = useState(false);
  const EditClicked = () => SetEditMode(true);
  let text = "";
 
  const OkClicked = () => {
    if(text !== ""){
      SetEditMode(false);
      onClick(text);
    }
  }

  

  return (
    <div className="AddTaskButton">
      {
        editing ?
        <div>
          <TextField
            className="TaskInput"
            id="standard-basic"
            placeholder="Type a name for this task"
            autoFocus={true}
            onChange = {e => text = e.target.value}
            />
          <Button variant="contained" onClick={OkClicked}>OK</Button>
        </div>
        :
        <Button variant="contained" color="primary" onClick={EditClicked} >Add Task</Button>
      }
    </div>
  );
}
 