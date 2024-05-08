import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";


function AdCategories() {

    const [categories, setCategories] = useState("");
    const [cate_label, setCate_label] = useState("");
    const [cate_description, setCate_description] = useState("");
    const [image, setImage] = useState(null);
    const [msg, setMsg] = useState("");

    useEffect(() => {

        async function getCategories() {
            try {
                const categoryResult = await (
                    await fetch("/api/v1/product/categories")
                ).json()
                setCategories(categoryResult.datas)

            } catch (error) {
                console.log(error)
            }

        }
        getCategories();
    }, [categories])

    async function handleUpload(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        const label = cate_label;
        formData.append('label', label);
        const description = cate_description;
        formData.append('description', description);

        try {
            const res = await fetch("http://localhost:9000/api/v1/categories/add", {
                method: 'post',
                body: formData,
            });
            const json = await res.json();
            setMsg(json.msg);
        } catch (error) {
            console.error('Erreur lors de l\'upload :', error.message);
        }
    };
    const handleDelete = (id) => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette categorie ? ");
        if (confirmed) {
            fetch("/api/v1/categories/delete/" + id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({ id }),
            });
        }
      };




    return (
        <>
            <h2>Crée une catégorie d'articles</h2>

            {msg && (<p className="msg_green">{msg}</p>)}

            <form onSubmit={handleUpload}>
                <label For="cate_label">Nom de la catégorie</label>
                <input type="text" name="cate_label" value={cate_label} onChange={(e) => setCate_label(e.target.value)} required />

                <label For="cate_description">Descriptionde la catégorie</label>
                <input type="text" name="cate_description" value={cate_description} onChange={(e) => setCate_description(e.target.value)} required />

                <label For="picture">Télécharger l'image *</label>
                <input required type="file" name="picture" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

                <button type="submit">Ajouter Catégorie</button>

            </form>
            <h3>Catégories existante :</h3>
            {!categories ? (<><p>Erreur chargement des catégories</p></>
            ) : (categories.map(categorie =>
                <>

                    <p>{categorie.label}
                    {categorie.id}
                        <button><Link to ={`/admin/true/update/categorie/${categorie.id}`} className ="edit-pen"><FontAwesomeIcon icon={faPenToSquare} /></Link></button>
                        
                        <button onClick ={()=>handleDelete(categorie.id)}className="edit-trash"><FontAwesomeIcon icon={faTrashCan} /></button> 
                    </p>
                </>
            ))}


        </>
    )
}




export default AdCategories;