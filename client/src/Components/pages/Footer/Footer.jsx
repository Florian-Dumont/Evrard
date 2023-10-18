import { NavLink } from "react-router-dom";

function Footer(){
    return(
        <footer>
            <div className="col-1">
                <NavLink><p>Catégories</p></NavLink>
                <NavLink><p>Ceintures</p></NavLink>
                <NavLink><p>Porte-feuilles</p></NavLink>
            </div>
            <div className="col-2">
                <NavLink><p>La marque</p></NavLink>
                <NavLink><p>La fabrication</p></NavLink>
                <NavLink><p>Notre histoire</p></NavLink>
            </div>
            <div className="col-3">
                <NavLink><p>Lien utiles</p></NavLink>
                <NavLink><p>CGV</p></NavLink>
                <NavLink><p>Contact</p></NavLink>
            </div>
        </footer>
        
    )
}
export default Footer;