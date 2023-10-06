import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signin } from "../../../../../store/slices/user";



function Form ({type}){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const[email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const [msg, setMsg] = useState(null);


    async function handleSubmit(e){
        e.preventDefault();

        const res = await fetch("api/v1/user/sign" + type, {
            method: "post",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({name, email, password}),
        })
        const json = await res.json();
        setMsg(json.msg);

        if(type === " in" && res.status === 200){
            localStorage.setItem("auth", json.TOKEN);
            dispatch(signin({name}))
            navigate("/") //renvoie vers page d'acceuille
        }
        if(type === "up" && res.status === 201){
            navigate("/utilisateur/connexion") // route utilisateur/connexion
        }
    }
    return(
        <>
            <form onSubmit={handleSubmit}> {/*formulaire de connexion/création*/}
             {/* !!!!!!!!!!!!!!!!!!!!!! 
                Ne pas oublier de sécurisé (HTMLspécialchars)
             !!!!!!!!!!!!!!!!!!
             */}

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
                    {type === "in" ? "Se connecter" : "S'inscrire"}
                </button>                
            </form>
            {type === "in" && (
                <p>Pas encore de compte ? {""}
                    <Link to="/utilisateur/creer-un-compte">En crée un</Link>
                </p>
            )}
        
        
        
        </>
    )

}
export default Form