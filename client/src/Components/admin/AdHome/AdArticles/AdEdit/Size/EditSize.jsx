import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; */
import BackButton from "../../../../../utils/BackButton.jsx"


function EditSize() {

    const [size, setSize] = useState("");    
    const [reference, setReference] = useState("")
    const [color, setColor] =useState("");
    const [price, setPrice] = useState("");
    const [id, setId] = useState("");
    const [msg, setMsg] = useState("");

    const params = useParams();
    

    useEffect(() => {
        async function getSize() {
            try {

                const datas = await fetch('/api/v1/size/' + params.id);
                const json = await datas.json();                
                setSize(json[0].size);
                setReference(json[0].reference)                
                setColor(json[0].color)
                setPrice(json[0].price)
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
            body: JSON.stringify({ size, color, id }),
        });
        const json = await res.json();
        setMsg(json.msg);    
    
    }


    return (
        <>

            <BackButton/>
            
            <h1 className="labelEditPanel">Detaille du produit</h1>
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="size">Taille du produit</label>
                <input type="text"
                    placeholder={size}
                    name="size"
                    value={size} onChange={(e) => setSize(e.target.value)}
                />

                <label htmlFor="reference">Réference du produit</label>
                <input type="text"
                    placeholder={reference}
                    name="reference"
                    value={reference} onChange={(e) => setReference(e.target.value)}
                />

                <label htmlFor="color">Couleur du produit</label>
                <input type="text"
                placeholder={color}
                name="color"
                value={color} onChange ={(e)=> setColor(e.target.value)} />

                <label htmlFor="price">Prix du produit</label>
                <input type="text"
                    placeholder={price}
                    name="price"
                    value={price} onChange={(e) => setPrice(e.target.value)}
                />


                {msg && <p className="msg_green">{msg}</p>}

                <button type="submit">Modifier</button>
            </form>
        </>
    )
}
export default EditSize;