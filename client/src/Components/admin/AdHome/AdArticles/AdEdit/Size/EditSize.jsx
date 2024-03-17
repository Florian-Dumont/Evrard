import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; */
import BackButton from "../../../../../utils/BackButton.jsx"


function EditSize() {

    const [size, setSize] = useState([]);
    const [label, setLabel] = useState("");
    const [color, setColor] =useState("");
    const [id, setId] = useState("");
    const [msg, setMsg] = useState("");

    const params = useParams();
    

    useEffect(() => {
        async function getSize() {
            try {

                const datas = await fetch('/api/v1/size/' + params.id);
                const json = await datas.json();
                setSize(json);
                setLabel(json[0].label);
                setColor(json[0].color)
                setId(json[0].id);

            } catch (error) {
                throw Error(error);
            }
        }
        getSize();

    }, []);



    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch('/api/v1/size/update/' + params.id, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label, color, id }),
        });
        const json = await res.json();
        setMsg(json.msg);    
    
    }


    return (
        <>

            <BackButton/>
            
            <h1 className="labelEditPanel">Taille</h1>
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="label">Taille du produit</label>
                <input type="text"
                    placeholder={label}
                    name="label"
                    value={label} onChange={(e) => setLabel(e.target.value)}
                />
                <label htmlFor="color">Couleur du produit</label>
                <input type="text"
                placeholder={color}
                name="color"
                value={color} onChange ={(e)=> setColor(e.target.value)} />


                {msg && <p className="msg_green">{msg}</p>}

                <button type="submit">Modifier</button>
            </form>
        </>
    )
}
export default EditSize;