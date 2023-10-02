import { NavLink } from "react-router-dom";

function Footer(){
    return(
        <>
        <div>
            <NavLink><p>Catégories</p></NavLink>
            <NavLink><p>Ceintures</p></NavLink>
            <NavLink><p>Porte-feuilles</p></NavLink>
        </div>
        <div>
            <NavLink><p>La marque</p></NavLink>
            <NavLink><p>La fabrication</p></NavLink>
            <NavLink><p>Notre histoire</p></NavLink>
        </div>
        <div>
            <NavLink><p>Lien utiles</p></NavLink>
            <NavLink><p>CGV</p></NavLink>
            <NavLink><p>Contact</p></NavLink>
        </div>
        </>
    )
}
export default Footer;