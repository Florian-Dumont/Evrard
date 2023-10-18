import {NavLink, Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
 

function Header(){

    const[isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const {info} = useSelector((state) =>state.user)
    console.log(info)

    return(
        <>
            <header>
                <div className="lang">
                    <p>Fr</p>
                    <p>En</p>
                </div>
                <div className="headerLogoSlogan">
                    <NavLink to = {"/"}><img className="headerLogo" src="/img/Placeholder.png" alt="" /></NavLink>
                    <p>Slogan</p>   
                </div>
                <div>
                
                {!info.isLogged ?(
                    
                    <NavLink to ={"/utilisateur/connexion"} className="logbtn"> Se connecter</NavLink>
                ):(
                    <>                    
                        <NavLink to={"utilisateur/deconnexion"} className="logbtn">Déconnexion</NavLink>
                        <p className="logname">{info.id}</p>
                    </>
                )}   
                </div>
                <div className="cart-btn">
                    <Link to=""><FontAwesomeIcon icon={faCartShopping} /></Link>
                    <p>0 articles</p>
                </div>
                
                
            </header>
            <div className="burger-icon" onClick={toggle}>
            <FontAwesomeIcon icon={faBars} />

            </div>

                {isOpen && (
                    <nav>
                        <NavLink to = {"/boutique"} >Boutique |</NavLink>
                        <NavLink to = {"/histoire"}> Notre Histoire |</NavLink>
                        <NavLink to = {"/fabrication"}> La fabrication</NavLink>
                    </nav>
                )}
            

        </>
    )
}
export default Header;