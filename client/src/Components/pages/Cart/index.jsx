import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';


import { addToCart } from "../../../store/slices/cart";


function Cart() {

  // récupère les informations sur les produits stockés en localstorage
  const { cartInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [cart, setCart] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let cartLS = localStorage.getItem('cart')
    const cartArr = JSON.parse(cartLS);
    if (cartArr) {
      setCart(cartArr.product);
    }
  }, []);

  // utilise les informations sur les produits stockés en localstorage pour fetch en boucle sur la base de donnée et afficher les images etc..
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getCart() {
      try {
        for (const item of cart) { // fecth dynamique via la référence du produit qui doit être unique
          const product = await fetch("/api/v1/orders/product/" + item.ref);
          if (product.status === 404) {
            setMsg("Un problème est survenu. S'il persiste contactez le service client")
          }
          if (product.status === 200) {
            const json = await product.json();
            setProducts((prevProduct) => [...prevProduct, ...json]);
          }
        }
      } catch (error) {
        throw Error(error);
      }
    }
    getCart()
  }, [cart]);

  // fonction d'incrémentation de la quantité d'un produit présent dans le panier
  const handleIncrease = (index) => {
    const newCart = [...cart];
    const item = { ...newCart[index] };
    item.quantity += 1;
    newCart[index] = item;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify({ product: newCart, buyer: cartInfo.buyer }));
    dispatch(addToCart({ product: newCart, buyer: cartInfo.buyer }));
    window.location.reload(); // le reload sert à contrecarer l'effet de mise à jour de la state product qui ajoute des lignes dans l'affichage du panier sans qu'on le veuille
  };

  // fonction de décrémentation de la quantité d'un produit présent dans le panier
  const handleDecrease = (index) => {
    const newCart = [...cart];
    const item = { ...newCart[index] };
    item.quantity = Math.max(item.quantity - 1, 0);
    newCart[index] = item;
    if (item.quantity === 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify({ product: newCart, buyer: cartInfo.buyer }));
    dispatch(addToCart({ product: newCart, buyer: cartInfo.buyer }));
    window.location.reload(); // le reload sert à contrecarer l'effet de mise à jour de la state product qui ajoute des lignes dans l'affichage du panier sans qu'on le veuille
  };

  // calcul le prix total des produits présents dans le panier
  function computeCartPrice() {
    let sum = 0;
    for (const item of cartInfo.product) {
      sum += item.quantity * item.priceEach;
    }
    return sum.toFixed(2);
  }

  // calcul la quantité totales des produits présents dans le panier
  function computeCartQuantity() {
    let sum = 0;
    for (const item of cartInfo.product) {
      sum += item.quantity;
    }
    return sum;
  }

  // fonction pour vider le panier
  function emptyCart() {
    localStorage.removeItem("cart");
    window.location.reload();
  };

  return (

    <>
      <h2>Panier</h2>

      <table className="cart-table">
        <thead className="cart-head">
          <tr>
            <th>-</th>
            <th>Référence</th>
            <th>Nom du produit</th>
            <th>Quantité</th>
            <th>Prix</th>
          </tr>
        </thead>

        <tbody>
          {!products.length ? (<>
            <tr>
              <th>Le panier est vide</th>
              <th>{msg && <p>{msg}</p>}</th>
            </tr>
          </>
          ) : (products.map((product, index) =>
            <>
              <tr>
                <td><img src={"/img/" + product.url_image} alt="image du produit" className="cart-img" /></td>
                <td>{product.reference}</td>
                <td>{product.label_1}</td>
                {/* affiche dans l'ordre du LS le prix de chaque article en fonction de leur quantité */}
                <td className="modify-quantity">
                  {/* affiche dans l'ordre du LS la quantité de chaque prduit ainsi que les boutons d'ajout et retrait */}
                  <button onClick={() => handleDecrease(index)} className='cart_btn'><FontAwesomeIcon icon={faCircleMinus} /></button>
                  <p className="cart_quantity">{cartInfo.product[index] ? cartInfo.product[index].quantity : ""}</p>
                  <button onClick={() => handleIncrease(index)} className='cart_btn'><FontAwesomeIcon icon={faCirclePlus} /></button>
                </td>
                <td>{cartInfo.product[index] ? parseFloat(cartInfo.product[index].priceEach * cartInfo.product[index].quantity).toFixed(2) : ""}€</td>
              </tr>
            </>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            {/* affiche le prix total des produits présent dans le panier */}
            <th>Total :{cartInfo.product.length ? computeCartPrice() + "€" : "0.00"}</th>
          </tr>
        </tfoot>

      </table>

      
      <button type="boutton" onClick={emptyCart}>Vider le panier</button>



    </>
  )
}

export default Cart;