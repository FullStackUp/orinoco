//déclaration de la variable "productsSaveLocalStorage" pour pouvoir stocker la key et value dans le localStorage

// "JSON.parse" permet de convertir les objets javascript du localstorage en JSON pour une meilleur visuel

let productsSaveLocalStorage = JSON.parse(localStorage.getItem("userOrder"));
//console.log(productsSaveLocalStorage);

//*******------- Debut Affichage des produits dans le panier -------*******//

//selection de la classe où je vais injecter le code HTML
const positionProductBasket = document.querySelector("#blocProductBasket");
//console.log(blocProductBasket);
let structureProductBasket = [];

//si le panier est vide : afficher "votre panier est vide" (si le panier n'est pas créer ou si tous les articles ont été supprimer à travers le bouton supprimer)
if(productsSaveLocalStorage === null || productsSaveLocalStorage == 0 ){
const emptyBasket = `
    <div id="emptyBasket">
        <div> Votre panier est vide. </div></br>
        <a href="./index.html"> Merci d'ajouter des articles.</a>
    </div> ` ;
    positionProductBasket.innerHTML = emptyBasket;
} else {//si le panier n'es pas vide : afficher les produits qui sont stocké dans le LocalStorage

        for(k = 0; k < productsSaveLocalStorage.length; k++ ){

            structureProductBasket = structureProductBasket + 
            `<div id="blocRecapOrder">
                <div>${productsSaveLocalStorage[k].Nom}</div> 
                <div>${productsSaveLocalStorage[k].Prix},00 € <button class="buttonDelete"> supprimer </button></div>
            </div>`; 
            /* !!! Le "Nom" et le "Prix" écrit de cette façon (N et P Majuscule) correspont 
            au "Nom" et "Prix" du LocalStorage et non du back-end et c'est moi qui l'ai definie 
            de cette façon dans le "_oriteddyproduct.js" dans la variable "optionProduct" !!!*/
        } 
        
        if(k == productsSaveLocalStorage.length) {
         //injection HTML dans la page panier
         positionProductBasket.innerHTML = structureProductBasket;
        }
    }

//*******------- Fin Affichage des produits dans le panier -------*******//

//*******------- Debut gestion du bouton supprimer article -------*******//

//selection des boutons supprimer
let buttonDelete = document.querySelectorAll(".buttonDelete");
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
        //productsSaveLocalStorage = productsSaveLocalStorage.filter( el => el.id !== idButtonDelete);
        //console.log(productsSaveLocalStorage);
        productsSaveLocalStorage.splice(l, 1);

        //on envoie le variable dans le LocalStorage
        //transforme en format JSON et l'envoie dans le Key du localStorage
        localStorage.setItem("userOrder", JSON.stringify(productsSaveLocalStorage));

        //alert pour avertir que le produit à été supprimer et rechargement de la page
        alert("ce produit à été supprimer et les autres articles avec le même id")
        window.location.href = "_oribasket.html";
    } )
}

//*******------- Fin gestion du bouton supprimer article -------*******//

//*******------- Debut prix total du panier -------*******//

//Déclaration de la variable pour mettre les prix issues du panier dedans
let totalPriceBasket = [];

//aller chercher les prix dans le panier
for (let m=0; m < productsSaveLocalStorage.length; m++){
    let priceProductsBasket = productsSaveLocalStorage[m].Prix;

    //mettre les prix dans la variable totalPriceBasket
    totalPriceBasket.push(priceProductsBasket)

    console.log(totalPriceBasket);
}

//additionner les prix du tableau variable "totalPriceBasket" avec la methode "reduce".
const reducer = (accumulator, currentValue) => accumulator +currentValue
const totalPriceFinal = totalPriceBasket.reduce(reducer,0);
console.log(totalPriceFinal)

//Le code HTML du prix total à afficher
const displayPriceHtml = `
<div id="displayPriceHtml"> Le prix total est : ${totalPriceFinal},00 € </div>`;

//injection du html dans la page panieraprès le dernier enfant
blocProductBasket.insertAdjacentHTML("beforeend", displayPriceHtml);

//Affiche le prix en euros dans le console log
console.log(new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPriceFinal));

//masque le prix total s'il n'y pas de produit selectionné
if(productsSaveLocalStorage === null || productsSaveLocalStorage == 0 ){
    const noDisplayPrice = document.querySelector("#displayPriceHtml").style.display ="none";
    //console.log("masque le prix")
    //console.log(noDisplayPrice);
}

//*******------- Fin prix total du panier -------*******//

//*******------- Debut Formulaire de la commande --------*******//

//selectionner les elements du DOM pour le positionnement du formulaire
const positionForm = document.querySelector("#blocProductBasket");

//code html du formulaire
const displayFormHtml = () => {
    const structureForm = `
    <div id="blocFormOrder">
      <h2 id="titleBlocFormOrder">Remplissez le formulaire pour valider votre commande</h2>
      <form>
        <div id="firstNameBlocFormOrder">
          <label for="firstNameFormOrder" id="labelFirstNameFormOrder"></label> Prénom : </label>
          <input type="text" id="firstNameFormOrder" name="Prénom" required>
        </div>

        <div id="nameBlocFormOrder">
          <label for="nameFormOrder" id="labelNameFormOrder"> Nom : </label>
          <input type="text" id="nameFormOrder" name="Nom" required>
        </div>    

        <div id="addressBlocFormOrder">
          <label for="addressFormOrder" id="labelAddressFormOrder"> Adresse : </label>
          <input id="addressFormOrder" name="Adresse" required>
        </div>

        <div id="cityBlocFormOrder">
          <label for="cityFormOrder" id="labelCityFormOrder"> Ville : </label>
          <input type="text" id="cityFormOrder" name="Ville" required>
        </div>

        <div id="postalCodeBlocFormOrder">
          <label for="postalCodeFormOrder" id="labelPostalCodeFormOrder"> Code Postal : </label>
          <input type="text" id="postalCodeFormOrder" name="CodePostal" required>
        </div>

        <div id="emailBlocFormOrder">
          <label for="emailFormOrder" id="labelEmailFormOrder"> E-mail : </label>
          <input type="text" id="emailFormOrder" name="Email" required>
        </div>

        <div id="btnSendFormBlocFormOrder">
          <button id="btnSendFormOrder" type="submit" name="btnSendFormOrder">
            Confirmer votre commande
          </button>
        </div>
    </form>
  </div>
    `;

//injection du html
positionForm.insertAdjacentHTML("afterend", structureForm);
};

//afficher le formulaire
displayFormHtml();

//selection du bouton envoyer formulaire
const btnSendFormOrder = document.querySelector("#btnSendFormOrder")

//AddEveTListerner
btnSendFormOrder.addEventListener("click", (e)=>{
//pour stopper le comportement par defaut
e.preventDefault();

//création (déinition) d'une classe pour fabriquer l'objet où iront les values du formulaire
class form{
  constructor(){
    this.Prenom = document.querySelector("#firstNameFormOrder").value;
    this.Nom = document.querySelector("#nameFormOrder").value;
    this.Adresse = document.querySelector("#addressFormOrder").value;
    this.Ville = document.querySelector("#cityFormOrder").value;
    this.CodePostal = document.querySelector("#postalCodeFormOrder").value;
    this.Email = document.querySelector("#emailFormOrder").value;
  }
}

//appel de l'instance de classe formulaire (form) pour créer l'objet "formValue"
const formValue = new form("Ville");

console.log("formulaire");
console.log(formValue);

//gestion des champs du formulaire (pour la validation) en contrôlant les données tapé par l'utilisateur
const textAlert = (value) => {
  return `${value}: les chiffres et les symbole ne sont pas autorisées \n Ne pas dépaseer 20 caractères et minimun 3 caractères`; 
}

const regExOnlyLetter = (value) => {//regualar expression(expression)
  return /^[A-Za-z\s-]{3,20}$/.test(value);
}

const regExAddress = (value) => {
  return /^[A-Za-z0-9\s]{5,50}$/.test(value);
}

const regExPostalCode = (value) =>{
  return /^[0-9]{5}$/.test(value);
}

const regExEmail = (value) =>{
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}

function firstNameControle(){
  //controle de la validation du prénom
  const theFirstName = formValue.Prenom;
  if (regExOnlyLetter(theFirstName)) {
    return true;
  } else {
    alert(textAlert("Prénom"));
    return false;
  }
};

function nameControle() {
  //controle de la validation du nom
  const theName = formValue.Nom;
  if (regExOnlyLetter(theName)) {
    return true;
  } else {
    alert(textAlert("Nom"));
    return false;
  }
};

function addressControle() {
  const theAddress = formValue.Adresse;
  if(regExAddress(theAddress)){
    return true;
  } else {
    alert("Adresse : ne pas mettre des ponctuation ou autre mais uniquement des chiffres et/ou lettres (minimun 5 caractères")
  }
}

function cityControle() {
  //controle de la validation de la ville
  const theCity = formValue.Ville;
  if (regExOnlyLetter(theCity)) {
    return true;
  } else {
    alert(textAlert("Ville"));
    return false;
  }
};

function postalCodeControle() {
  //controle de la validation de la ville
  const thePostalCode = formValue.CodePostal;
  if (regExPostalCode(thePostalCode)) {
    return true;
  } else {
    alert("CodePostal : veillez entrer les 5 chiffres de votre code postal");
    return false;
  }
};

function emailControle() {
  //controle de la validation de la ville
  const theEmail = formValue.Email;
  if (regExEmail(theEmail)) {
    return true;
  } else {
    alert("Email: veillez entrer un email valide");
    return false;
  }
};

if (firstNameControle() , nameControle() , addressControle(), cityControle(), postalCodeControle(), emailControle()){
  //Mettre l'objet "formValue" dans le localStorage(évite d'avoir des key different)
  localStorage.setItem("formValue", JSON.stringify(formValue));
  } else{
  alert("Veuillez bien remplir le formulaire en respectant les caractères avant de confirmer votre commande")
  }

//mettre les values dans un formulaire et mettre les produits dans un objet à envoyer
const toSendForm = {
    productsSaveLocalStorage, 
    formValue
}

console.log("à envoyer")
console.log(toSendForm);

//Envoie de l'objet "tosendForm" vers le serveur
const promise01 = fetch(https://)

});

//masque le formulaire s'il n'y pas de produit selectionée
if(productsSaveLocalStorage === null || productsSaveLocalStorage == 0 ){
    const noDisplayForm = document.querySelector("#blocFormOrder").style.display ="none";
    console.log("masque le formulaire")
    console.log(noDisplayForm);
}
//*******------- Fin Formulaire de la commande --------*******//