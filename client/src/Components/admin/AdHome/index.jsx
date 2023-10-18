import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import AdArticles from "./AdArticles"
import AdCommandes from "./AdCommandes";
import AdInventaire from "./AdInventaire";
import AdStats from "./AdStats"






    function PannelAdminParent() {
        const [selectedTab, setSelectedTab] = useState("");

        const renderComponent = () => {
            switch(selectedTab) {                
                case "articles":
                    return <AdArticles/>
                case "commandes":
                    return <AdCommandes/>
                case "inventaire":
                    return <AdInventaire/>
                case "stats":
                    return <AdStats/>
                default: 
                    return null;
            }
        }


    return(
        <>
            <div className="admin-ctn">
                <h1 className="admin-ttle">Pannel admin</h1>
                <p><Link to ="/"><FontAwesomeIcon icon={faHouse} /></Link></p>
                <div>
                    
                    <button onClick = {() => setSelectedTab("articles")}>Gestion des produits</button>
                    <button onClick ={() => setSelectedTab("commandes")}>Commandes en cours</button>
                    <button onClick = {() =>setSelectedTab("inventaire")}>Inventaire</button>
                    <button onClick ={() => setSelectedTab("stats")}>Statistique</button>
                </div>
                <div>{renderComponent()}</div>
            </div>
        </>
    )
}

export default PannelAdminParent