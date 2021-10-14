main();

async function main (){
    const productId = getProductId()
    const productDetailed = await getProductDetailed(productId)
    transferProduct(productDetailed)
    basketUser(productDetailed)
}

function getProductId(){
   return new URL(location.href).searchParams.get("id")//permet de recuperer l'Id d'un produit parmis des articles 
}

function getProductDetailed(productId){//cette fonction parmet qui recuperer un seul produit
    return fetch(`http://localhost:3000/api/cameras/${productId}`)
    .then(function (httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function (product) { //ligne 14 à 21 ont été copié des même lignes du "_oritcamerasarticles.js"
      return product;
    })
    .catch(function (error) {//si j'ai une erreur c'est le bloc catch qui affichera un message
      alert(error);
      alert(`WARNING information : veuillez vous connecter au serveur "port 3000" ou activer javascript`);
    });

}

//Fonction qui permet de recuperer les valeurs de l'API d'un produit et de le transfere dans le html
function transferProduct(productDetailed){
  const copyBlocTemplateProduct = document.getElementById("blocTemplateProductCamera");
  const cloneBlocTemplateProduct = document.importNode(copyBlocTemplateProduct.content, true); 

  //Debut blocHeaderCardProduct
  cloneBlocTemplateProduct.getElementById("imageCardProductCamera").src = productDetailed.imageUrl;
  cloneBlocTemplateProduct.getElementById("imageCardProductCamera").alt = productDetailed.description;
  cloneBlocTemplateProduct.getElementById("titleCardProductCamera").textContent = productDetailed.name;
  //Fin blocHeaderCardProduct

  //Debut blocDetailedProduct
  cloneBlocTemplateProduct.getElementById("numberOpinionCustomerCamera").textContent = "104 évaluations";
  cloneBlocTemplateProduct.getElementById("descriptionNumberCardProductCamera").textContent = productDetailed.description;

  cloneBlocTemplateProduct.getElementById("descriptionPriceCardProductCamera").textContent = "Prix* unitaire : "
  cloneBlocTemplateProduct.getElementById("priceCardProductCamera").textContent = productDetailed.price / 100 + ",00" + " " + "€";

  cloneBlocTemplateProduct.getElementById("descriptionProductLensesOptionCamera").textContent = "Lenses désirée :";
  cloneBlocTemplateProduct.getElementById("productOptionOneCamera").value = productDetailed.lenses[0];
  cloneBlocTemplateProduct.getElementById("productOptionTwoCamera").value= productDetailed.lenses[1];
  cloneBlocTemplateProduct.getElementById("productOptionThreeCamera").value = productDetailed.lenses[2];
  cloneBlocTemplateProduct.getElementById("productOptionFourCamera").value = productDetailed.lenses[3];
  cloneBlocTemplateProduct.getElementById("productOptionOneCamera").textContent = productDetailed.lenses[0];
  cloneBlocTemplateProduct.getElementById("productOptionTwoCamera").textContent = productDetailed.lenses[1];
  cloneBlocTemplateProduct.getElementById("productOptionThreeCamera").textContent = productDetailed.lenses[2];
  cloneBlocTemplateProduct.getElementById("productOptionFourCamera").textContent = productDetailed.lenses[3];
  
  cloneBlocTemplateProduct.getElementById("amountOrderProductCamera").textContent = "Quantité désirée :";
  cloneBlocTemplateProduct.getElementById("buttonAddBasketCamera").textContent = "Ajouter au panier";
  cloneBlocTemplateProduct.getElementById("buttonSeeBasketCamera").textContent = "Voir mon panier";
  cloneBlocTemplateProduct.getElementById("buttonContinuedBuyCamera").textContent = "Continuer mes achats";
  //Fin blocDetailedProduct

  cloneBlocTemplateProduct.getElementById("informationPriceCardProductCamera").textContent = "*tous les prix incluent la TVA."
  document.getElementById("mainProductCamera").appendChild(cloneBlocTemplateProduct);//fait apparaître le elements en visuel

  console.log(productDetailed);
};

//Panier = inspiré du YouTubeur e-genieclimatique

//Ajout un produit chosit dans le panier
function basketUser (productDetailed) {
    //selectionne le bouton ajouter l'article au panier
    const SendBasket = document.querySelector("#buttonAddBasketCamera");
    //ecoute le bouton et l'envoie au panier
    SendBasket.addEventListener("click", (event) => {
    event.preventDefault();
    
    //récuperer des valeur du des données API pour le produit envoye au panier en fonction de son numéro d'id.
    let optionProduct = {
      Nom : productDetailed.name, 
      Prix : productDetailed.price /100,
      id : productDetailed._id,
      Lenses : productDetailed.lenses,
      quantité : productDetailed.quantite,
      Image : productDetailed.imageUrl,
    }

    //déclaration de la variable "productsSaveLocalStorage" pour pouvoir stocker la key et value dans le localStorage
    
    // "JSON.parse" permet de convertir les objets javascript du localstorage en JSON pour une meilleur visuel

    let productsSaveLocalStorage = JSON.parse(localStorage.getItem("userOrder"));
    
    if(productsSaveLocalStorage){
      productsSaveLocalStorage.push(optionProduct);
      //transforme en format JSON et l'envoie dans le Key du localStorage
      localStorage.setItem("userOrder", JSON.stringify(productsSaveLocalStorage));

      alert("Le produit a été ajouté au panier");
    } else{
      productsSaveLocalStorage = [];
      productsSaveLocalStorage.push(optionProduct);
      localStorage.setItem("userOrder", JSON.stringify(productsSaveLocalStorage));

      alert("Le produit a été ajouté au panier")
      console.log(productsSaveLocalStorage);
    }


    //limitation du notre de produit dans le panier
    if(productsSaveLocalStorage.length >= 5){
      alert("l'ajout n'a pas pu être réalisé car vous avez atteint le nombre maximum de produit dans votre panier , veuillez passer votre commande ou enlever des articles de votre panier par suppression");
      window.location = "/front-end/html/_oribasket.html";
    } 
  
  });

   //permert de selectionner une options (afficher que sur la console log)
   let elt = document.getElementById('productLensesOptionCamera');
   elt.addEventListener('change' , function(){
     console.log(elt);
   })
   
   //supprime les choix des options en plus en fonction du produit
   let x = productDetailed.lenses[1];
    if (x === undefined) {
    document.getElementById("productOptionTwoCamera").style.display = "none";
    }

    let y = productDetailed.lenses[2];
    if (y === undefined) {
    document.getElementById("productOptionThreeCamera").style.display = "none";
    }
    
    let z = productDetailed.lenses[3];
    if (z === undefined) {
    document.getElementById("productOptionFourCamera").style.display = "none";
    }  
};