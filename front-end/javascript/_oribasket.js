//déclaration de la variable "productsSaveLocalStorage" pour pouvoir stocker la key et value dans le localStorage

// "JSON.parse" permet de convertir les objets javascript du localstorage en JSON pour une meilleur visuel

let productsSaveLocalStorage = JSON.parse(localStorage.getItem("userOrder"));
console.log(productsSaveLocalStorage);

//*******------- Debut Affichage des produits dans le panier -------*******//

//selection de la classe où je vais injecter le code HTML
const blocProductBasket = document.querySelector("#blocProductBasket");
console.log(blocProductBasket);
let structureProductBasket = [];

//si le panier est vide : afficher "votre panier est vide" (si le panier n'est pas créer ou si tous les articles ont été supprimer à travers le bouton supprimer)
if(productsSaveLocalStorage === null || productsSaveLocalStorage == 0 ){
const emptyBasket = `
    <div id="emptyBasket">
        <div> Votre panier est vide. </div></br>
        <a href="./index.html"> Merci d'ajouter des articles.</a>
    </div> ` ;
    blocProductBasket.innerHTML = emptyBasket;
} else {//si le panier n'es pas vide : afficher les produits qui sont stocké dans le LocalStorage

        for(k = 0; k < productsSaveLocalStorage.length; k++ ){

            structureProductBasket = structureProductBasket + 
            `<div id="blocRecapOrder">
                <div>Quantité : 1 - ${productsSaveLocalStorage[k].Nom}</div> 
                <div>${productsSaveLocalStorage[k].Prix} - <button id="buttonDelete"> supprimer </button></div>
            </div>`; 
            /* !!! Le "Nom" et le "Prix" écrit de cette façon (N et P Majuscule) correspont 
            au "Nom" et "Prix" du LocalStorage et non du back-end et c'est moi qui l'ai definie 
            de cette façon dans le "_oriteddyproduct.js" dans la variable "optionProduct" !!!*/
        } 
        
        if(k == productsSaveLocalStorage.length) {
         //injection HTML dans la page panier
         blocProductBasket.innerHTML = structureProductBasket;
        }
    }

//*******------- Fin Affichage des produits dans le panier -------*******//

//*******------- Debut gestion du bouton supprimer article -------*******//

//selection des boutons supprimer
let buttonDelete = document.querySelectorAll("#buttonDelete");
console.log(buttonDelete);

for (let l = 0; l < buttonDelete.length; l++){
    buttonDelete[l].addEventListener("click" , (event) =>{
        event.preventDefault();

        //selectionne le produit (par rapport à son id) à supprimer 
        let idButtonDelete = productsSaveLocalStorage[l].id;//idem que le "Nom" et "Prix" (ligne 32 à 34)
        console.log("idButtonDelete");
        console.log(idButtonDelete);

        /*avec la methode filter je selectionne les élements à garder 
        et je supprime l'élement où le bouton supprimer (buttonDelete) a été cliqué*/
        productsSaveLocalStorage = productsSaveLocalStorage.filter( el => el.id !== idButtonDelete);
        console.log(productsSaveLocalStorage);

        //on envoie le variable dans le LocalStorage
        //transforme en format JSON et l'envoie dans le Key du localStorage
        localStorage.setItem("userOrder", JSON.stringify(productsSaveLocalStorage));

        //alert pour avertir que le produit à été supprimer et rechargement de la page
        alert("ce produit à été supprimer et les autres articles avec le même id")
        window.location.href = "_oribasket.html";
    } )
}