import React, { useState } from 'react';
import "./taskPopUp.scss"

import { useContext } from 'react';
import { MyContext } from '../../App';

//React icons...
import {CiCircleRemove} from "react-icons/ci"
import {AiOutlineEdit} from "react-icons/ai"

const TaskPopUp = () => {

    const {popUpData, setPopUpData, showTaskPop, setShowTaskPop, stationNum, test, setTest, destination} = useContext(MyContext)
    const [render, setRender] = useState(false)


    const [isUpdating, setIsUpdating] = useState(false);

    

    const handleCheckBox = (e) => {
        const columnIndex = 
            test[stationNum].userInfo
                .findIndex(col => col.id === destination.columnId);

        const task = 
            test[stationNum].userInfo[columnIndex]
               .tasks.findIndex(x => x.id === destination.taskId);

        test[stationNum].userInfo[columnIndex].tasks[task].subtask[e.currentTarget.value].completed = !test[stationNum].userInfo[columnIndex].tasks[task].subtask[e.currentTarget.value].completed

        setRender(!render)
    }


    const [subForm, setSubForm] = useState({
        title: "",
        description: ""
    })

    const handleChange = (e) => {
        setPopUpData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = () => {
        const arr = Array.from(test)

        const columnIndex = arr[stationNum].userInfo.findIndex(col => col.id === destination.columnId)
        const taskIndex = arr[stationNum].userInfo[columnIndex].tasks.findIndex(task => task.id === destination.taskId)

        arr[stationNum].userInfo[columnIndex].tasks[taskIndex].title = popUpData.title
        arr[stationNum].userInfo[columnIndex].tasks[taskIndex].description = popUpData.description

        setTest(arr)
        setIsUpdating(false)
    }


    return (
        <section className={`task-pop-up-overlay ${showTaskPop ? "active" : ""}`}>
        {popUpData.title &&
            <>
                <div className={`task-pop-up ${showTaskPop ? "active" : ""}`}>
                    <button className='exit-task-pop-up' onClick={() => {
                        setShowTaskPop(false)
                        setIsUpdating(false)
                    }}>
                        <CiCircleRemove/>
                    </button>
                    {
                    isUpdating 
                        ? <input autoFocus className='h1-input' value={popUpData.title} name='title' onChange={handleChange}/> 
                        : <h1>{popUpData.title}</h1> 
                    }
                    <p className='task-description'>
                        {isUpdating 
                            ? <textarea className='description-input' name="description" value={popUpData.description}  onChange={handleChange} />
                            : popUpData.description
                        }
                    </p>
                    <h5>Subtask ({popUpData.subtask.length} of 3)</h5>
                    <div className='subtask-wrap'>
                        {popUpData.subtask[0].subTitle &&
                            popUpData.subtask.map((task, index) => (
                                <div key={task.id} className='single-subtask'>
                                    <input 
                                        type='checkbox'                               
                                        checked={task.completed}
                                        key={task.id}
                                        value={index}
                                        onChange={handleCheckBox}
                                    />
                                    <span style={{textDecoration: task.completed ? "line-through" : "none"}}>{task.subTitle}</span> 
                                </div>
                            ))
                        }
                    </div>
                    <span>Status: {popUpData.status}</span>
                    {isUpdating && 
                        <button 
                            className='confirm-btn updt-cnfm-posit' 
                            onClick={handleSubmit}
                        >
                            Confirm
                        </button>
                    }
                    {!isUpdating && 
                        <button 
                            className='update-btn updt-cnfm-posit' 
                            onClick={() => setIsUpdating(prev => !prev)}
                        >
                            <AiOutlineEdit/>
                        </button>
                    }
                </div>
            </>

        }
        </section>
    );
};

export default TaskPopUp;