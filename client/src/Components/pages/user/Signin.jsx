import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"
import { signin } from "../../../store/slices/user"


function FormIn(){

    const navigate = useNavigate()

    const [name, setName] = useState("");
    const[email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const [msg,setMsg] = useState(null)
    const dispatch = useDispatch();



    async function handleSubmit(e){
        e.preventDefault();

        const res = await fetch("/api/v1/user/signin" , {
            method: "post",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({name, email, password}),
        })
        const json = await res.json();
        setMsg(json.msg);
        if(res.status === 200){
            localStorage.setItem("auth",json.TOKEN)
            dispatch(signin({name}))
            navigate("/");
        }
        if(res.status === 201){
            navigate("/utilisateur/connexion")
        }
        

    }    
    return(
<>
        <form onSubmit={handleSubmit}> {/*formulaire de connexion*/}
            

                <input
                    type="text"
                    placeholder = "Votre nom"
                    name ="name" 
                    value = {name} onChange = {(e) => setName(e.target.value)}
                />
                <input 
                    type="email"
                    placeholder ="Votre email" 
                    name="email"
                    value ={email} onChange={(e) =>setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder ="Votre password"
                    name="password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
                   <button type="submit">
                    Se connecter                    
                </button>
                <div>
                <Link className='linktoup' to ={"/utilisateur/creer-un-compte"} >Pas de compte ? crée en un !</Link>
                </div>
            </form>
            

            {msg &&<p>{msg}</p>}
</>
    )
}
export default FormIn