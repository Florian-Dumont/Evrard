function setTitle(page){
    switch(page){
        case "/":
            return "Accueil Evrard - Les meilleurs Produit en cuir bolivien !"
            
        case "/boutique":
            return "La boutique"

        case "/utilisateur/connexion":
            return "Evrard - Connexion utilisateur"

        case "/histoire":
            return "A propos - L'histoire de "

        case "/utilisateur/creer-un-compte":
            return "Evrard - Création de compte"

        case "/fabrication":
            return "Evrard - La fabrication"

        case "/boutique/Ceinture/1":
            return "Nos ceintures"

        case "/boutique/Porte-feuille/2":
            return "Nos porte-feuilles"

        case "/boutique/Porte-carte/3":
            return "Nos porte-cartes"
        
        case"/boutique/Sacoche-en-cuir/4":
            return " Nos sacoches en cuir"

           

        default:
        
    }
}
export {setTitle}