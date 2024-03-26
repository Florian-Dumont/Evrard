import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; */
import BackButton from "../../../../../utils/BackButton";

function EditDetails(){

    const [label, setLabel] = useState("");
    const [reference, setReference] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [id, setId] = useState("");
    const [msg, setMsg] = useState("");

    const params = useParams();

    useEffect(()=> {
        async function getDetails(){
            try {
                
                const datas = await fetch("/api/v1/details/" + params.id)
                const json = await datas.json();
                
                //console.log(datas);

                setLabel(json[0].label_1);
                setReference(json[0].reference);
                setDescription(json[0].description);
                setPrice(json[0].price);
                setId(json[0].id);


            } catch (error) {
                throw Error(error)
            }
        }
        getDetails();
    },[]);

    async function handleSubmit(e){
        e.preventDefault();
        
        const res = await fetch ("/api/v1/details/update/" + params.id,{
            method: "post",
            headers: { "Content-Type" : "application/json"},
            body : JSON.stringify({label,reference,description,price,id}),
        });
        const json = await res.json();

        console.log("JSON " + json)
        console.log("message " + json.msg);

        setMsg(json.msg);

    }
    
    return(

        <>
        <BackButton/>
            <h1>hello</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="label">Nom du produit</label>
                <input type="text"
                    placeholder={label}
                    name="label"
                    value={label} onChange={(e) => setLabel(e.target.value)}
                />

                <label htmlFor="reference">Reference du produit</label>
                <input type="text"
                placeholder={reference}
                name="reference"
                value={reference} onChange ={(e)=> setReference(e.target.value)} />

                <label htmlFor="description">Description du produit</label>
                <textarea type="text"
                placeholder={description}
                name="description"
                value={description} onChange ={(e)=> setDescription(e.target.value)} />

                <label htmlFor="price">Prix du produit</label>
                <input type="text"
                placeholder={price}
                name="price"
                value={price} onChange ={(e)=> setPrice(e.target.value)} />


                {msg && <p className="msg_green">{msg}</p>}

                <button type="submit">Modifier</button>
            </form>
        </>
    )      
        
        
    

}
export default EditDetails;