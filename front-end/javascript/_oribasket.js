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
        for (p = 0; p < productsSaveLocalStorage.length; p++ ){

            structureProductBasket = structureProductBasket + 
            `<div id="blocRecapOrder">
                <div>${productsSaveLocalStorage[p].Nom}</div> 
                <div>${productsSaveLocalStorage[p].Prix},00 € <button class="buttonDelete"> supprimer </button></div>
            </div>`; 
            /* !!! Le "Nom" et le "Prix" écrit de cette façon (N et P Majuscule) correspont 
            au "Nom" et "Prix" du LocalStorage et non du back-end et c'est moi qui l'ai definie 
            de cette façon dans le "_oriteddyproduct.js" dans la variable "optionProduct" !!!*/
        };
        
        if(p == productsSaveLocalStorage.length) {
         //injection HTML dans la page panier
         positionProductBasket.innerHTML = structureProductBasket;
        }
      };

//*******------- Fin Affichage des produits dans le panier -------*******//

//*******------- Debut gestion du bouton supprimer article -------*******//

//selection des boutons supprimer
let buttonDelete = document.querySelectorAll(".buttonDelete");
//console.log(buttonDelete);

for (let l = 0; l < buttonDelete.length; l++){
    buttonDelete[l].addEventListener("click" , (event) =>{
        event.preventDefault();

        //selectionne le produit (par rapport à son id) à supprimer 
        let idButtonDelete = productsSaveLocalStorage[l].id;//idem que le "Nom" et "Prix" (ligne 32 à 34)
        console.log("idButtonDelete");
        console.log(idButtonDelete);

        //supprime un article
        productsSaveLocalStorage.splice(l, 1);

        //on envoie le variable dans le LocalStorage
        //transforme en format JSON et l'envoie dans le Key du localStorage
        localStorage.setItem("userOrder", JSON.stringify(productsSaveLocalStorage));

        //alert pour avertir que le produit à été supprimer et rechargement de la page
        alert("vous avez supprimé un article de votre panier")
        window.location.href = "_oribasket.html";
    } )
}

//*******------- Fin gestion du bouton supprimer article -------*******//

//*******------- Debut prix total du panier -------*******//

//Déclaration de la variable pour mettre les prix issues du panier dedans
let totalPriceBasket = [];

/*aller chercher les prix dans le panier 
masque le formulaire s'il n'y pas de produit selectionée
masque le prix total s'il n'y pas de produit selectionné*/
if(productsSaveLocalStorage === null || productsSaveLocalStorage == 0){
  
} else {
for (let m=0; m < productsSaveLocalStorage.length; m++){
    let priceProductsBasket = productsSaveLocalStorage[m].Prix;

    //mettre les prix dans la variable totalPriceBasket
    totalPriceBasket.push(priceProductsBasket)

    //console.log(totalPriceBasket);
  }
}

//additionner les prix du tableau variable "totalPriceBasket" avec la methode "reduce".
const reducer = (accumulator, currentValue) => accumulator +currentValue
const totalPriceFinal = totalPriceBasket.reduce(reducer,0);
//console.log(totalPriceFinal)

//Le code HTML du prix total à afficher
const displayPriceHtml = `
<div id="displayPriceHtml"> Le prix total est : ${totalPriceFinal},00 € </div>`;

//injection du html dans la page panieraprès le dernier enfant
blocProductBasket.insertAdjacentHTML("beforeend", displayPriceHtml);

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
          <label for="firstName" id="labelFirstName"></label> Prénom : </label>
          <input type="text" id="firstName" name="Prénom" required></br>
          <span id="firstNameMissing"></span>
        </div>

        <div id="lastNameBlocFormOrder">
          <label for="lastName" id="labelLastName"> Nom : </label>
          <input type="text" id="lastName" name="Nom" required></br>
          <span id="lastNameMissing"></span>
        </div>    

        <div id="addressBlocFormOrder">
          <label for="address" id="labelAddress"> Adresse : </label>
          <input id="address" name="Adresse" required></br>
          <span id="addressMissing"></span>
        </div>

        <div id="cityBlocFormOrder">
          <label for="city" id="labelCity"> Ville : </label>
          <input type="text" id="city" name="Ville" required></br>
          <span id="cityMissing"></span>
        </div>

        <div id="emailBlocFormOrder">
          <label for="email" id="labelEmail"> E-mail : </label>
          <input type="text" id="email" name="Email" required></br>
          <span id="emailMissing"></span>
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

/*masque le prix total s'il n'y pas de produit selectionné
masque le formulaire s'il n'y pas de produit selectionée*/
if(productsSaveLocalStorage === null || productsSaveLocalStorage == 0 ){
  const noDisplayPrice = document.querySelector("#displayPriceHtml").style.display ="none";
  //console.log("masque le prix")
  //console.log(noDisplayPrice);
  const noDisplayForm = document.querySelector("#blocFormOrder").style.display ="none";
  //console.log("masque le formulaire")
  //console.log(noDisplayForm);
} 

//selection du bouton envoyer formulaire
const btnSendFormOrder = document.querySelector("#btnSendFormOrder")

//AddEveTListerner
btnSendFormOrder.addEventListener("click", (e) => {
//pour stopper le comportement par defaut
e.preventDefault();
    const firstNameForm = document.querySelector("#firstName").value;
    const lastNameForm = document.querySelector("#lastName").value;
    const addressForm = document.querySelector("#address").value;
    const cityForm = document.querySelector("#city").value;
    const emailForm = document.querySelector("#email").value;

    const order = {
      contact: {
      firstName : firstNameForm,
      lastName : lastNameForm,
      address : addressForm,
      city : cityForm,
      email : emailForm 
      },
      products : [productsSaveLocalStorage],
    };
  //gestion des champs du formulaire (pour la validation) en contrôlant les données tapé par l'utilisateur
  const regExOnlyLetter = (value) => {//regualar expression(expression)
  return /^[A-Za-z\s-]{3,20}$/.test(value);
  }

  const regExAddress = (value) => {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
  }

  const regExEmail = (value) =>{
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  }

  function firstNameControle(){
    //controle de la validation du prénom
    if (regExOnlyLetter(firstNameForm)) {
      document.querySelector("#firstNameMissing").textContent ="";
      return true;
    } else {
      document.querySelector("#firstNameMissing").textContent ="veuillez entrer un prénom valide";
      return false;
    }
  };

  function lastNameControle() {
    //controle de la validation du nom
    if (regExOnlyLetter(lastNameForm)) {
      document.querySelector("#lastNameMissing").textContent ="";
      return true;
    } else {
      document.querySelector("#lastNameMissing").textContent ="veuillez entrer un nom valide";
      return false;
    }
  };

  function addressControle() {
    //controle de la validation de l'adresse
    if(regExAddress(addressForm)){
      document.querySelector("#addressMissing").textContent ="";
      return true;
    } else {
      document.querySelector("#addressMissing").textContent ="veuillez entrer une adresse valide";
      return false;
    }
  }

  function cityControle() {
    //controle de la validation de la ville
    if (regExOnlyLetter(cityForm)) {
      document.querySelector("#cityMissing").textContent ="";
      return true;
    } else {
      document.querySelector("#cityMissing").textContent ="veuillez entrer une ville valide";
      return false;
    }
  };

  function emailControle() {
    //controle de la validation de la ville
    if (regExEmail(emailForm)) {
      document.querySelector("#emailMissing").textContent ="";
      return true;
    } else {
      document.querySelector("#emailMissing").textContent ="veuillez entrer un email valide";
      return false;
    }
  };

  if (firstNameControle() , lastNameControle() , addressControle(), cityControle(), emailControle()){
    //Mettre l'objet "order" dans le localStorage(évite d'avoir des key different)
    localStorage.setItem("order", JSON.stringify(order));
  } else {
        alert("Veuillez bien remplir le formulaire sans utiliser des caractères spéciaux avant de confirmer votre commande")
      }


  //mettre les values dans un formulaire et mettre les produits dans un objet à envoyer
  console.log(order);

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  }

  fetch(`"http://localhost:3000'/api/teddies/order"`, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
    })
    .catch((error) => {
      alert(error)
    });
});


//*******------- Fin Formulaire de la commande ------*/