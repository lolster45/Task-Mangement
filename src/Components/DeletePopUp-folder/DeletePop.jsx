//React...
import React, {useContext} from 'react';

//Components...
import { MyContext } from '../../App';


//React icons...
import {CiCircleRemove} from "react-icons/ci"

//Styles...
import "./deletePop.scss"



const DeletePop = () => {

    const {test, stationNum, setDltWorkPopUp, deleteWorkstation, dltWorkPopUp} = useContext(MyContext)



    return (
        <div className={`delete-popup-overlay ${dltWorkPopUp ? "active" : ""}`}>
            <div className={`delete-main-popup ${dltWorkPopUp ? "active" : ""}`}>
                <CiCircleRemove 
                    className='remove-popup-icon'
                    onClick={() => setDltWorkPopUp(false)}
                />
                <h2>Warning</h2>
                <p>This will permanently delete the project. Continue?</p>
                <button 
                    data-workstationid={test[stationNum].id}
                    onClick={deleteWorkstation}
                >
                        Delete Workstation
                </button>
            </div>
        </div>
    );
};

export default DeletePop;