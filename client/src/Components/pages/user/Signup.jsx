import {useState} from 'react'
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";


function FormUp(){

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
        navigate("/utilisateur/connexion");

    }    
    return(
<>
        <form onSubmit={handleSubmit}> {/*formulaire de création*/}
             

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
                    S'inscrire                    
                </button> 
                <div>
                <Link className='linktoup' to ={"/utilisateur/connexion"} >Déja un compte ? connectez-vous</Link>
                </div>
            </form>

            {msg &&<p>{msg}</p>}
</>
    )
}
export default FormUp