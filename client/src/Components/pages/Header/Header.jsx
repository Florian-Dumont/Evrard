import {NavLink, Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState, useEffect } from "react";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { addToCart } from "../../../store/slices/cart";

 

function Header(){

    const[isOpen, setIsOpen] = useState(false);
    const[isCartOpen, setIsCartOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const cartToggle = () => setIsCartOpen(!isCartOpen)

    // const {info} = useSelector((state) =>state.user)
    
    const [user, setUser] = useState(null);
    const myuserid = localStorage.getItem("myuserid");
    console.log("userId",myuserid)

    useEffect(() => {
        async function getUserHeader() {
            try {
                let email = "";
                if (!myuserid) {
                    return
                } else {
                    email = myuserid;
                }

                // const TOKEN = getItemWithExpiration('auth');
                const users = await fetch("/api/v1/user/" + email, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authentication': `Bearer ${TOKEN}`
                    }
                });

                if (users.status === 200) {
                    const json = await users.json();
                    setUser(json.user);
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getUserHeader();
    }, []);

    
    const { cartInfo } = useSelector((state) => state.cart); // reducer du panier

    function computeCart() {
        {/* Affiche le nombre de produit dans le panier  au niveau du pictogramme*/ }
        let sum = 0;
        if (!cartInfo) { // sert à réinitialiser l'affichage du panier vide lors du localStorage.removeItem("cart")
            return sum = 0;
        } else {
            for (const item of cartInfo.product) {
                sum += item.quantity;
            }
            return sum;
        }
    }


    
    console.log("user ------->",user)

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
                
                {!user ?(
                    
                    <NavLink to ={"/utilisateur/connexion"} className="logbtn"> Se connecter</NavLink>
                ):(
                    <>                    
                        <NavLink to={"utilisateur/deconnexion"} className="logbtn">Déconnexion</NavLink>
                        <p className="logname">{user[0].name}</p>
                    </>
                )}   
                </div>
                <div className="cart-btn" onClick={cartToggle}>
                    <div ><FontAwesomeIcon icon={faCartShopping} /></div>
                    <p>{cartInfo.product.length ? computeCart() : "0"} articles</p>
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
                {isCartOpen && (
                    <div>
                        <h1>test</h1>
                    </div>
                )}
            
        </>
    )
}
export default Header;