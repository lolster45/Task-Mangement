//React....
import { useState, createContext, useRef, useEffect} from 'react'
export const MyContext = createContext();

//Components...
import {v4 as uuidv4} from "uuid"
import Form from './Components/FormFolder/Form'
import KanbanBoard from './Components/Main-layout'
import TaskPopUp from './Components/TaskPop-folder/TaskPopUp';
import AddColumn from './Components/AddColumn-folder/AddColumn';
import DeletePop from './Components/DeletePopUp-folder/deletePop';

//React icons...
import {TbLayoutBoardSplit} from "react-icons/tb"
import {HiDotsVertical} from "react-icons/hi"
import {BsTrash3Fill, BsFillSunFill, BsMoonStarsFill} from "react-icons/bs"
import {MdDriveFileRenameOutline} from "react-icons/md"
import {BiSelectMultiple} from "react-icons/bi"
import {AiOutlineDoubleLeft, AiOutlineDoubleRight} from "react-icons/ai"

//Styles...
import './App.scss'

function App() {

  //Theme styles...
  const [theme, setTheme] = useState("dark");
    //Decides the styles of the theme...
    useEffect(() => {
      if(theme === "light") {
        root.style.setProperty('--main-text-color', 'black');
        root.style.setProperty('--light-gray', 'white');
        root.style.setProperty('--dark-gray', 'white');
        root.style.setProperty('--light-purple', '#645FC5');

        root.style.setProperty('--main-task-background-color', '#E8F0FB');
        root.style.setProperty('--main-task-single-task-bg', 'white');
        root.style.setProperty('--main-column-hover', '#d9e5f7');
        root.style.setProperty('--main-bg-btn', '#d9e5f7');
        root.style.setProperty('--single-task-selected-bg', '#d6e6fe');
        root.style.setProperty('--single-task-shadow-color', 'rgba(231,231,231,0.68)');
        
        root.style.setProperty('--border-color', 'transparent');

        root.style.setProperty('--add-form-input-bg', 'white');
        root.style.setProperty('--add-column-input-bg', '#d9e5f7');

        root.style.setProperty('--bg-scrollbar', 'white');
      } 
      else if(theme === "dark") {
        root.style.setProperty('--main-text-color', 'white');
        root.style.setProperty('--light-gray', '#2C2C38');
        root.style.setProperty('--dark-gray', '#21212D');
        root.style.setProperty('--light-purple', '#645FC5');

        root.style.setProperty('--main-task-background-color', '#21212D');
        root.style.setProperty('--main-task-single-task-bg', '#2C2C38');
        root.style.setProperty('--main-column-hover', '#3d3d4a');
        root.style.setProperty('--main-bg-btn', '#272737');
        root.style.setProperty('--single-task-selected-bg', '#3d3d48');
        root.style.setProperty('--single-task-shadow-color', '#21212D');


        root.style.setProperty('--border-color', '#444450');

        
        root.style.setProperty('--add-form-input-bg', '#2C2C38');
        root.style.setProperty('--add-column-input-bg', '#2C2C38');
        
        root.style.setProperty('--bg-scrollbar', '#2C2C38');
      }
    }, [theme])


  //Shows the form input to add new task...
  const [showForm, setShowForm] = useState(false)

  const [formInput, setFormInput] = useState({
    title: "",
    description: "",
    subTasks: [
      {
        id: uuidv4(), 
        title: ""
      }
    ]
  })


  //Project/workstation setup with data...
  const [stationNum, setStationNum] = useState(1)

  const [test, setTest] = useState([
    {
      id: uuidv4(),
      userTitle: "klobet",
      userInfo: [
        {
          id: uuidv4(),
          color: "#4CC2E7",
          status: "TODO",
          tasks: [
              {
                id: uuidv4(),
                status: "TODO",
                title: "Fix the light to dark theme switch",
                description: "how are you doing",
                subtask: [
                    {
                      id: uuidv4(),
                      completed: false,
                      subTitle: "Everyting works but the background does not change color"
                    }
                ]
              },
              {
                id: uuidv4(),
                status: "TODO",
                title: "Feed klobet",
                description: "I need to feed him by tonight",
                subtask: [
                    {
                      id: uuidv4(),
                      completed: false,
                      subTitle: "The meet up place is by emperor hall"
                    }
                ]
              }
          ]
        },
        {
          id: uuidv4(),
          color: "#8673F2",
          status: "DOING",
          tasks: []
        },
        {
          id: uuidv4(),
          color: "#69E5B0",
          status: "DONE",
          tasks: []
        }
      ]
    },
    {
      id: uuidv4(),
      userTitle: "Facebook",
      userInfo: [
        {
          id: uuidv4(),
          color: "#4CC2E7",
          status: "TODO",
          tasks: [
              {
                id: uuidv4(),
                status: "TODO",
                title: "Accomodate for Z Fold series screen size",
                description: "With the addition of the z fold zeries, we need to adjust our mobile apps' responsiveness to adjust to the smaller screen of the z fold",
                subtask: [
                    {
                      id: uuidv4(),
                      completed: false,
                      subTitle: "Need to fix the homescreen image not fitting in"
                    },
                    {
                      id: uuidv4(),
                      completed: false,
                      subTitle: "Blocks in the home screen overlapping/falling out of screen"
                    }
                ]
              },
              {
                id: uuidv4(),
                status: "TODO",
                title: "Feed the users fake info",
                description: "Boss asked to inject up to date propoganda",
                subtask: [
                    {
                      id: uuidv4(),
                      completed: false,
                      subTitle: "We need to divide the peopel more and more so we can do whatever the fuck we want"
                    }
                ]
              }
          ]
        },
        {
          id: uuidv4(),
          color: "#8673F2",
          status: "DOING",
          tasks: []
        },
        {
          id: uuidv4(),
          color: "#69E5B0",
          status: "DONE",
          tasks: []
        }
      ]
    }
  ])  
    

  //Adds a new task to the TODO column of the workstation...
  const addNewTask = () => {
    if(formInput.title && formInput.description) {
      const newArr = Array.from(test);
      newArr[stationNum].userInfo[0].tasks.unshift({
         id: uuidv4(),
         status: "TODO",
         title: formInput.title,
         description: formInput.description,
         subtask: [
             ...formInput.subTasks.map(task => ({
               id: task.id,
               completed: false,
               subTitle: task.title
             }))
         ]
      })
      setTest(newArr)
      //Resets the user form...
      setFormInput({
        title: "",
        description: "",
        subTasks: [{id: uuidv4(), title: ""}]
      })
      //Removes the form popUp...
      setShowForm(false)
    } 
    else if (!formInput.title) {

    } 
    else if (!formInput.description) {

    }
  }


  //Add column to main layout...
  const [showColumnForm, setShowColumnForm] = useState(false)
  const [colForm, setColForm] = useState({
    status: "",
    color: ""
  })

  const addColumn = () => {
    if(!colForm.status) return
    
    const newArr = Array.from(test);
    newArr[stationNum].userInfo.push({
       id: uuidv4(),
       color: colForm.color,
       status: colForm.status.toUpperCase(),
       tasks: []
    })
    setShowColumnForm(false)
    setTest(newArr)
    setColForm({ status: "", color: ""})
  }

  
  //<angaes when the user clicks on task for it to show up/get the data for it...
  const [showTaskPop, setShowTaskPop] = useState(false)

  const [destination, setDestination] = useState({
    columnId: "",
    taskId: ""
  })
  const taskPopUp = (e) => {
    const columnId = e.currentTarget.getAttribute("data-columnid");
    const taskId = e.currentTarget.getAttribute("data-taskid");

    setDestination(prev => ({
      columnId: columnId,
      taskId: taskId
    }))

    const res = test[stationNum].userInfo.find(col => col.id === columnId)
    const finalTask = res.tasks.find(task => task.id === taskId)

    setPopUpData(finalTask)
    setShowTaskPop(true)
  }


  //When you click on a task, this is the state that holds the data that shows up...
  const [popUpData, setPopUpData] = useState([])


  //This is for creating a new workstation/tab...
  const [tabName, setTabName] = useState("");
  const [showInputTab, setShowInputTab] = useState(false);

  const handleNewTabSubmit = (e) => {
    e.preventDefault()
    createNewBoard(tabName)
  }

  const createNewBoard = (name) => {
    if(!name) return;

    setTest(prev => [...prev, {
      id: uuidv4(),
      userTitle: name,
      userInfo: [  
        {
          id: uuidv4(),
          color: "#4CC2E7",
          status: "TODO",
          tasks: []
        },
        {
          id: uuidv4(),
          color: "#8673F2",
          status: "DOING",
          tasks: []
        },
        {
          id: uuidv4(),
          color: "#69E5B0",
          status: "DONE",
          tasks: []
        },
      ]
    }])
    setShowInputTab(false)
    setTabName("")
    setStationNum(test.length)
  }


  //The three little dots icons options...
  const [showOptions, setShowOptions] = useState(false)

  

  //Renaming workstation...
  const [rename, setRename] = useState({
    isChanging: false,
    renameInput: ""
  });

  const changingWorkStationName = (e) => {
    setRename(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const renameWorkstation = () => {
    const newArr = Array.from(test);
    newArr[stationNum].userTitle = rename.renameInput;

    setTest(newArr)
    setRename({
      isChanging: false,
      renameInput: ""
    })
  }



  //PopUp that deletes the workstation you are on....
  const [dltWorkPopUp, setDltWorkPopUp] = useState(false);

  const deleteWorkstation = (e) => {
    const workstationId = e.target.getAttribute("data-workstationid");
    const result = test.filter(station => station.id !== workstationId);

    console.log(result)

    setDltWorkPopUp(false)
    setStationNum(0)
    setTest(result)
  }

  //Select tasks code...
  const [selected, setSelected] = useState({
    userSelecting: false,
    selectedTasksIDs: []
    
  });

  const deleteSelectedTasks = () => {
    let arr = Array.from(test)
    
    let projName = arr[stationNum].userInfo;

    for (let i = 0; i < projName.length; i++) {
      if(projName[i].tasks.some(item => selected.selectedTasksIDs.includes(item.id))) {
        let res = projName[i].tasks.filter(task => !selected.selectedTasksIDs.includes(task.id))
        projName[i].tasks = res
      }
    }
    setTest(arr)

    setSelected({
      userSelecting: false,
      selectedTasksIDs: []
    })
  }


  //State that manages if the side bar is closed or open...
  const [opened, setOpened] = useState(true);




  return (
    <div className="App">
      <nav className={`${opened ? "" : "closed"}`}>
        <h1>Nav Things</h1>
        <h4>ALL BOARDS ({test.length})</h4>
        <div className='all-boards'>
          {test &&
            test.map((workstation, index) => (
              <p 
                key={workstation.id}
                onClick={() => setStationNum(index)} 
                className={`single-tab ${index === stationNum ? "active" : ""}`}
              >
                <TbLayoutBoardSplit/>   
                <span style={{display: stationNum === index && rename.isChanging ? "none" : "block"}}>
                  {workstation.userTitle}
                </span> 
                {rename.isChanging && stationNum === index &&
                    <input 
                      autoFocus 
                      onKeyDown={(e) => {
                        if(e.key === "Enter" ) renameWorkstation()
                      }} 
                      name="renameInput"
                      placeholder={workstation.userTitle}
                      value={rename.renameInput}
                      onChange={changingWorkStationName}
                      onBlur={() => setRename(prev => ({...prev, isChanging: false}))}
                    />
                }
              </p>
            ))
          } 
          {showInputTab &&
            <form onSubmit={handleNewTabSubmit} className='single-tab form'>
              <TbLayoutBoardSplit/>
              <input 
                autoFocus 
                onBlur={() => setShowInputTab(false)}
                onChange={(e) => setTabName(e.currentTarget.value)} 
              />
            </form>
          }
          <button className='add-new-tab' onClick={() => setShowInputTab(prev => !prev)}>        
            {!showInputTab &&
              <>
                <TbLayoutBoardSplit/>
                <span>Create New Board</span>
              </>
            }
            {showInputTab && <span>Cancel</span>}
          </button>

          <button 
            className='close-sidebar' 
            onClick={() => setOpened(prev => !prev)}
          >
            {opened && <AiOutlineDoubleLeft/>}
            {!opened && <AiOutlineDoubleRight/>}
          </button>
        </div>
      </nav>
      <MyContext.Provider 
        value={{showForm, setShowForm, setFormInput, formInput, addNewTask, addColumn, test, setTest, stationNum, taskPopUp, popUpData, setPopUpData, destination, addColumn, colForm, setColForm, setShowColumnForm, dltWorkPopUp, setDltWorkPopUp, deleteWorkstation, selected, setSelected, showTaskPop, setShowTaskPop, opened}}
      >
        <Form/>
        <TaskPopUp/>
        <DeletePop/>
        {showColumnForm && <AddColumn/>}
        <section className={`task-section ${opened ? "" : "closed"}`}>
          <div className='add-task-container'>
            Platform launch
            {/* Showing the selected amount of tasks that you want to delete... */}
            {selected.userSelecting &&
              <div className='selected-task-info'>
                ({selected.selectedTasksIDs.length})
                Selected
                <button onClick={deleteSelectedTasks}>✓</button>
                <button onClick={() => {
                  setSelected({userSelecting: false, selectedTasksIDs: []})
                }}>X</button>
              </div>
            }
            {/* --------------------------------------------------------------------- */}
            <div className='add-task-btns'>
              <button onClick={() => setShowForm(true)}>+Add New Task</button>
              <span onClick={() => setShowOptions(prev => !prev)}>
                <HiDotsVertical/>
              </span>
            </div>
              <aside className={`options ${showOptions ? "active" : ""}`}>
                <div 
                  onClick={() => {
                    setShowOptions(false)
                    setDltWorkPopUp(true)
                  }} 
                >
                  <BsTrash3Fill className='delete-icon'/>Delete Board
                </div>
                <div
                  onClick={() => {
                    setShowOptions(false)
                    setRename(prev => ({...prev, isChanging: true}))
                  }}
                >
                  <MdDriveFileRenameOutline className='rename-icon'/>Rename
                </div>
                <div 
                  onClick={() => {
                    setShowOptions(false)
                    setSelected(prev => ({
                      ...prev,
                      userSelecting: !prev.userSelecting
                    }))
                  }}
                  >
                  <BiSelectMultiple className='select-icon'/>Select task
                </div>
                {theme === "dark" &&
                  <div onClick={() => {
                    setShowOptions(false)
                    setTheme("light")
                  }}>
                    <BsFillSunFill className='lightMode-icon'/>Light Mode
                  </div>
                }
                {theme === "light" &&
                  <div onClick={() => {
                    setShowOptions(false)
                    setTheme("dark")
                  }}>
                    <BsMoonStarsFill className='darkMode-icon'/>Dark Mode
                  </div>
                }
              </aside>   
          </div>
          <KanbanBoard/>
        </section>  
      </MyContext.Provider>
    </div>
  )
}

export default App
