import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; */
import BackButton from "../../../../../utils/BackButton.jsx";

function EditDetails(){

    const [label, setLabel] = useState("");
    const [reference, setReference] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [id, setId] = useState("");
    const {msg, setMsg} = useState("")

    const params = useParams();

    useEffect(()=> {
        async function getDetails(){
            try {
                
                const datas = await fetch("/api/v1/details/" + params.id)
                const json = await datas.json();
                console.log(datas);
                setLabel(json);
                setReference(json[0].Reference);
                setDescription(json[0].description);
                setPrice(json[0].price);
                setId(json[0].id)


            } catch (error) {
                throw Error(error)
            }
        }
        getDetails();
    },[]);

    async function handleSubmit(e){
        e.preventDefault();
        const res = await fetch ("/api/v1/details/update/" + params.id,{
            methode: "post",
            headers: { "Content-Type" : 'application/json'},
            body : JSON.stringify({label,reference,description,price,id}),
        });
        const json = await res.json();
        setMsg(json.msg);

    }
    
    return {      
        
        
    }

}
export default EditDetails;