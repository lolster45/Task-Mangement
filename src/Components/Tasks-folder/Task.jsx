import React from 'react';

//React icons...
import {ImCheckboxChecked} from "react-icons/im"


import "./tasks.scss"

const Task = ({title, taskPopUp, columnId, taskId, selected, setSelected}) => {

    const changeSelectedStatus = () => {
        if(!selected.selectedTasksIDs.includes(taskId)) {
            setSelected(prev => ({
                ...prev,
                selectedTasksIDs: [...prev.selectedTasksIDs, taskId]
            }))
        } 
        else {    
            const arr = Array.from(selected.selectedTasksIDs).filter(item => item !== taskId)
            setSelected(prev => ({
                ...prev,
                selectedTasksIDs: [...arr]
            }))    
        }
    }



    return (
        <div 
            data-columnid={columnId} 
            data-taskid={taskId} 
            onClick={ selected.userSelecting ? changeSelectedStatus : taskPopUp} 
            className={`
                individual-task ${selected.selectedTasksIDs.includes(taskId) ? "selected" : ""} `
            }
        >
        {selected.userSelecting && 
            <span className='selected-status-icon'>
                {selected.selectedTasksIDs.includes(taskId) &&
                    <ImCheckboxChecked/>
                }
            </span>
        }            
        {title}
        </div>
    );
};

export default Task;