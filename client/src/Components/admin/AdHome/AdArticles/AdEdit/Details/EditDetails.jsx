import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; */
import BackButton from "../../../../../utils/BackButton";
import EditDetailsPictures from "./EditDetailsPictures";

function EditDetails() {

    const [label, setLabel] = useState("");
    const [reference, setReference] = useState("");
    const [description, setDescription] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [id, setId] = useState("");
    const [product_id, setProduct_Id] = useState("");
    const [msg, setMsg] = useState("");


    const params = useParams();
    const detailId = params.id;

    useEffect(() => {
        async function getDetails() {
            try {

                const details = await fetch("/api/v1/details/product/" + detailId)
                const json = await details.json();

                /* console.log("clg", json);
                console.log(params.id) */

                setLabel(json[0].label_1);
                setReference(json[0].reference);
                setDescription(json[0].description);
                setSize(json[0].size);
                setColor(json[0].color);
                setPrice(json[0].price);
                setQuantity(json[0].quantity);
                setId(json[0].id);
                setProduct_Id(json[0].product_id);


            } catch (error) {
                throw Error(error)
            }
        }
        getDetails();
    }, []);

    /* async function handleSubmitProduct(e) {
        e.preventDefault();

        const res = await fetch("/api/v1/details/update_product/" + product_id, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label,description, product_id}),
        });
        const json = await res.json();

        console.log("JSON " + json)
        console.log("message " + json.msg);

        setMsg(json.msg);
    } */
    async function handleSubmitDetails(e) {
        e.preventDefault();

        const res = await fetch("/api/v1/details/update/" + params.id, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label,description,reference,size,price,color,quantity,detailId,product_id }),
        });
        const json = await res.json();

        console.log("JSON " + json)
        console.log("message " + json.msg);

        setMsg(json.msg);
    }

    return (

        <>
            <BackButton />
            <h1 className="form-title-edit">Modification des information du produit : {label} - EditDetails</h1>

            <form className="form-container" onSubmit={handleSubmitDetails}>

                <div className="form-group">
                    <label htmlFor="label">Nom du produit :</label>
                    <input className="input"
                        type="text"
                        placeholder={label}
                        name="label"
                        value={label} onChange={(e) => setLabel(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description du produit : </label>
                    <textarea className="input"
                        type="text"
                        placeholder={description}
                        name="description"
                        value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                                
            
                <div className="form-group">
                    <label htmlFor="reference">Reference du produit :</label>
                    <input className="input"
                        type="text"
                        placeholder={reference}
                        name="reference"
                        value={reference} onChange={(e) => setReference(e.target.value)} />
                </div>

                

                <div className="form-group">
                    <label htmlFor="size">Taille :</label>
                    <input className="input"
                        type="text"
                        placeholder={size}
                        name="size"
                        value={size} onChange={(e) => setSize(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="couleur">Couleur :</label>
                    <input className="input"
                        type="text"
                        placeholder={color}
                        name="couleur"
                        value={color} onChange={(e) => setColor(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Prix du produit :</label>
                    <input className="input"
                        type="text"
                        placeholder={price}
                        name="price"
                        value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Quantité en stock :</label>
                    <input className="input"
                        type="text"
                        placeholder={quantity}
                        name="quantity"
                        value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>


                {msg && <p className="msg_green">{msg}</p>}

                <button type="submit">Modifier</button>
            </form>


            <EditDetailsPictures detailId={detailId} />
        </>
    )




}
export default EditDetails;