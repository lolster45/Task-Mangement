import React, {useContext} from 'react';
import "./addColumn.scss"

import { MyContext } from '../../App';


const AddColumn = () => {

    const {addColumn, colForm, setColForm, setShowColumnForm} = useContext(MyContext)

    const handleColumnFormChange = (e) => {
        setColForm(prev => ({
          ...prev,
          [e.target.name]: e.target.value
        }))

    }



    return (
        <div className='add-column-overlay'>
            <div className='add-col-form'>
                <label>
                    Status:
                    <input 
                        className='status-input'
                        autoFocus
                        onChange={handleColumnFormChange}
                        name="status"
                        maxLength={20}
                        //value={colForm.status}
                    />
                </label>
                <label>
                    Color:
                    <input 
                        className='color-input' 
                        onChange={handleColumnFormChange}
                        name='color'
                        //value={colForm.color}
                        type="color"
                    />
                </label>
                <div className='addCol-btn-container'>
                    <button onClick={() => setShowColumnForm(false)}>Cancel</button>
                    <button onClick={addColumn}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default AddColumn;