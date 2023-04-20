//React...
import React, { useContext } from 'react';

//Components...
import { MyContext } from '../App';
import Task from './Tasks-folder/Task';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"

//Styles...
import "../index.scss"

function DraggableElement() {
  

  const {taskPopUp, test, setTest, stationNum, setShowColumnForm, selected, setSelected} = useContext(MyContext)


  

  
  const onDragEnd = (result) => {
    if(!result.destination) return

    if(result.destination.droppableId === result.source.droppableId && 
      result.destination.index === result.source.index) return

    const newItems = 
      Array.from(test)

    //Here we find the index of the original column we grabbed from and also from the column where we are going to dump are task into...
    const sourceIndexColumn = 
      newItems[stationNum].userInfo.findIndex(column => column.id === result.source.droppableId);
    const destinationIndexColumn = 
      newItems[stationNum].userInfo.findIndex(column => column.id === result.destination.droppableId);
    const newColumnStatus = 
      newItems[stationNum].userInfo[destinationIndexColumn].status;
      
    //We remove the original that we moved/update the status of the task...
    const [removedItem] = 
      newItems[stationNum].userInfo[sourceIndexColumn].tasks.splice(result.source.index, 1);
    
    removedItem.status = newColumnStatus
    

    //We updated our newItems array to include the now new task in its new position...
    newItems[stationNum].userInfo[destinationIndexColumn].tasks.splice(result.destination.index, 0, removedItem)
    setTest(newItems)
  
  }

  return (
    <div className="main-layout-container">
      <DragDropContext onDragEnd={onDragEnd}>
        {test.length > 0 &&
          <div className='columns-wrap'>
            {
              test[stationNum]?.userInfo.map(column => (
                    <Droppable key={column.id} droppableId={column.id}>
                      {(provided, snapshot) => (
                        <div 
                          className="single-columns" 
                          ref={provided.innerRef} 
                          {...provided.droppableProps}
                          style={{
                            backgroundColor: snapshot.isDraggingOver ? "var(--main-column-hover)" : "transparent"
                          }}
                        >
                          <h3 className="kanban-column-title" on>
                            <span style={{backgroundColor: column.color}}></span>
                            {column.status} ({column.tasks.length})
                          </h3> 
                          <div className="task-section">    
                            {
                              column.tasks.map((task, index) => (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.id}
                                  index={index}                            
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}                                
                                    >
                                      <Task columnId={column.id} taskId={task.id} taskPopUp={taskPopUp} title={task.title} selected={selected} setSelected={setSelected}/>
                                    </div>
                                  )}
                                </Draggable>
                              ))
                            }
                          </div>        
                            {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
              ))
            }
            <button onClick={() => setShowColumnForm(true)}>+ New Column</button>
          </div>
        }
        {!test.length && <h1>sigh...</h1>}
      </DragDropContext>
    </div>
  );
}

export default DraggableElement;
