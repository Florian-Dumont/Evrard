import React from "react";
import { useState } from "react";
import AdCreation from "./AdCreation";
import AddPic from "./AdCreation/AddPic";
import AdEdit from "./AdEdit";
import Categories  from "./AdCategories/index";
import { Link } from "react-router-dom";



function AdArticles(){
    const [selectedSubTab, setSelectedSubTab] = useState("all");

    const handleSubTabClick = (subTab) =>{
        setSelectedSubTab(subTab)
    }
    return(
        <>
        <div>
            <h2>Gestion des articles</h2>
            <div>
                
                <button onClick = {() => handleSubTabClick("Création")}>Création</button>
                <button onClick = {() => handleSubTabClick("AddPic")}>Ajouter une image</button>
                <button onClick = {() => handleSubTabClick("Categories")}>Catégories</button>
                <button><Link to="update">Modification</Link></button>                
            </div>        
            <div>{selectedSubTab === "Création" && <div><AdCreation/></div>}</div>
            <div>{selectedSubTab === "AddPic" && <div><AddPic/></div>}</div>
            <div>{selectedSubTab === "Categories" && <div><Categories/></div>}</div>            
            
        </div>

        </>
    )
}

export default AdArticles;