import {useState} from 'react'
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";


function FormIn(){

    const navigate = useNavigate()

    const [name, setName] = useState("");
    const[email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const [msg,setMsg] = useState(null)



    async function handleSubmit(e){
        e.preventDefault();

        const res = await fetch("/api/v1/user/signup" , {
            method: "post",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({name, email, password}),
        })
        const json = await res.json();
        setMsg(json.msg);
        navigate("/");

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
                    Se connecté                    
                </button>                
            </form>
            <Link to ={"/utilisateur/creer-un-compte"} >Pas de compte ? crée en un !</Link>

            {msg &&<p>{msg}</p>}
</>
    )
}
export default FormIn