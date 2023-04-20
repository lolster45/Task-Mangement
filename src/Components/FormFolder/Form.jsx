//Reacts...
import { useContext, useState } from "react"

//Components...
import { MyContext } from "../../App"
import {v4 as uuidv4} from "uuid"

//Styles...
import "./Form.scss"

const Form = () => {

    const {setShowForm, formInput, setFormInput, addNewTask, showForm} = useContext(MyContext)

    const handleChange = (e) => {
        setFormInput(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    //Add subTask to the current task you are on...
    const [sTaskLimit, setSTaskLimit] = useState(1)

    const addSubTask = () => {
        if(sTaskLimit >= 3) return;
        setFormInput(prev => ({
            ...prev,
            subTasks: [
                ...prev.subTasks,
                {
                    id: uuidv4(),
                    title: ""
                }
            ]
        }))
        setSTaskLimit(prev => prev + 1)
    }
    //---------------------------------------------

    //Delete certain subtask you clicked to delete...
    const handleDelete = (e) => {
        if(sTaskLimit === 1) return;
        
        const subIndex = e.target.getAttribute("data-index");
        const [newArr] = Array.from([formInput])
        const result = newArr.subTasks.filter(obj => obj.id !== subIndex)
        setFormInput(prev => ({
            ...prev,
            subTasks: [
                ...result
            ]
        }))
        setSTaskLimit(prev => prev - 1)
    }
    //------------------------------------------------


    
    //Cancel the form which sets back everyting to normal...
    const cancelForm = () => {
        setFormInput(prev => ({
            ...prev,
            subTasks: [
                {
                    id: uuidv4(),
                    title: ""
                }
            ]
        }))

        setShowForm(false)
    }
    //------------------------------------------------------


    const subTaskChange = (e) => {
        const index = e.currentTarget.getAttribute("data-index")
        formInput.subTasks[index].title = e.currentTarget.value
    }

    return (
        <section className={`form-black-overlay ${showForm ? "active" : ""}`}>
            <div className={`form-container ${showForm ? "active" : ""}`}>
                <h2>Add New Task</h2>
                <label className="label-input">
                    Title
                    <input 
                        className="title-input"
                        placeholder="e.g. Take coffe break"
                        name="title"
                        onChange={handleChange}
                    />
                </label>
                <label className="label-input">
                    Description
                    <textarea 
                        placeholder="e.g. its alwasy good to take a break. This 15 minute break will recharge the batteries a little."
                        name="description"
                        maxLength={600}
                        onChange={handleChange}
                    />
                </label>
                <label className="subtask-main-container">
                    Subtask
                    {
                        formInput.subTasks.map((task, i) => (
                            <div
                                key={task.id} 
                                className="subtask-single-container"
                            >
                                <input 
                                    data-index={i} 
                                    onChange={subTaskChange} 
                                    placeholder="task"
                                />
                                <button 
                                    className="delete-subtask"  
                                    onClick={handleDelete} 
                                    data-index={task.id}
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    }
                </label>
                <button className="add-new-sub" onClick={addSubTask}>+ Add New Subtask</button>
                <div className="form-nav">
                    <button className="navBtn exit-button" onClick={cancelForm}>Cancel</button>
                    <button className="navBtn create-task-button" onClick={addNewTask}>+ Add New Subtask</button>
                </div>
            </div>
        </section>
    )
}

export default Form