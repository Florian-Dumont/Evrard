import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import React from "react";

function Header(){

    const {info} = useSelector(state =>state.user)

    return(
        <>
            <header>
                <div>
                    <p>Français</p>
                    <p>English</p>
                </div>
                <div>
                    <NavLink to = {"/"}><img src="" alt="" /></NavLink>
                    <p>Slogan</p>   
                </div>
                <div>
                {!info.isLogged ?
                    <NavLink to ={"/utilisateur/connexion"}> Se connecter</NavLink>
                    :
                    <NavLink to={"utilisateur/deconnexion"}>Déconnexion</NavLink>
                }   
                </div>
                <nav>
                    <NavLink to = {"/boutique"} >Boutique</NavLink>
                    <NavLink to = {"/histoire"}>Notre Histoire</NavLink>
                    <NavLink to = {"/fabrication"}>La fabrication</NavLink>
                </nav>
            </header>

        </>
    )
}
export default Header;