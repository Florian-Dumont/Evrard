# BLOG

Un client vous a donnée une mission !!
Pas de bol c'est une association, ça paye pas mais ça fait bien sur le cv 🤪🤪🤪 

Vous avez 3 jours pour réaliser un blog !

Il n'a pas de maquette, il vous fait confiance pour le design.

Il a des connaissances dans le fonctionnement du web moderne.
Il veut que sont site soit responsive, et adapté pour le mobile -> tablette -> grand écran

Contient les pages :
- accueil
- page de connexion/création de compte
- profil
- détail d'article

et un back-office

## Détails des pages :

Accueil :
- liste tous les articles
- et les 3 derniers commentaires quel que soit l'article commenté

Connexion / création :
- le formulaire

Profil :
- l'utilisateur doit pouvoir modifier ses informations et effacer son compte

Back-office :
- liste tous les commentaire, articles et utilisateurs
- pouvoir effectuer les opérations d'ajout, modification, suppression

------
> partie client terminé
------

## Les modules

- express pour les routes ..
- express-session pour maintenir les données entre 2 cycles
- ejs pour le rendu
- bcrypt pour hasher les mots de passe
- mysql2 pour la connexion à la bdd
- dotenv pour gérer les données "privés"

### Nouveauté, insérer une image via un formulaire
L'image est envoyé dans le dossier public.
Il faut également écrire son nom dans la table( bdd ) adéquate !

Pour traiter l'envoi de l'image dans un dossier de notre serveur :
- module formidable https://www.npmjs.com/package/formidable


## détail utilisateur

- connexion via email - password
- création de compte -> alias - email - password

alias et email doivent être uniques parmi tous les utilisateurs
pas d'adresse à demander, il n'y a pas de livraison donc aucune raison de le lui demander


## étapes

**analyser les besoins de l'application en les posants sur papier par exemple pour faciliter la création de la bdd..**

1. La base de données
    - schéma ( MCD -> MLD)
    - création ( MPD) via phpmyadmin ou import fichier sql
2. Le backend (server)
    - initialisation et installation des modules
    - structurer les dossiers/fichiers
    - configurer
        - moteur de rendu
        - variables d'environnement
        - "brancher" la BDD
        - ...
    - mettre en place les routes
    - tester les routes sur postman donc "répondre" en json(CRUD complet)
    - modifier les réponses JSON en render (render)
3. le frontend (client gérer ici avec un moteur de rendu (ejs))
    - commencer par le panneau admin, permet d'effectuer du CRUD plus facilement
    - les autres pages

## structure

Vous pouvez passer en MVC directement.
OU
Simple fichier et une fois l'application terminée la refactoriser en MVC.