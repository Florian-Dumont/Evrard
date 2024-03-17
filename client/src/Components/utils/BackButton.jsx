import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function BackButton() { 
      const handleClick = () =>{
        window.history.back()
      }
    

    return (
        <button className="backbutton" onClick={handleClick}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </button>
    );
}


export default BackButton;
