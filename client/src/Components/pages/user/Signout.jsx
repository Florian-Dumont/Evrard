import React, {useState} from "react";
import { signout } from "../../../store/slices/user"
import { useDispatch } from "react-redux"
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";




function Signout(){

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const navigate = useNavigate("")

    
    dispatch(signout({name}))

    function back(){
        localStorage.removeItem("auth");
        localStorage.removeItem("myuserid");
        setTimeout(()=>{
            navigate("/")
        },2000)
        
    }
    back();
    

    return(
       <p>Vous etes déconnecté, retour a <Link to ="/">l'acceuil</Link></p>
    )
}

export default Signout