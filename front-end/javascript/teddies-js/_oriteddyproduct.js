main();

async function main (){
    const productId = getProductId()
    const productDetailed = await getProductDetailed(productId)
    transferProduct(productDetailed)
    console.log(productDetailed);
}


function getProductId(){
   return new URL(location.href).searchParams.get("id")//permet de recuperer l'Id d'un produit parmis des articles 
}

function getProductDetailed(productId){//cette fonction parmet qui recuperer un seul produit
    return fetch(`http://localhost:3000/api/teddies/${productId}`)
    .then(function (httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function (product) { //ligne 14 à 21 ont été copié des même lignes du "_oriteddiesarticles.js"
      return product;
    })
    .catch(function (error) {//si j'ai une erreur c'est le bloc catch qui affichera un message
      alert(error);
      alert(`WARNING information : veuillez vous connecter au serveur "port 3000" ou activer javascript`);
    });

}

function transferProduct(productDetailed){
  const copyBlocTemplateProduct = document.getElementById("blocTemplateProduct");
  const cloneBlocTemplateProduct = document.importNode(copyBlocTemplateProduct.content, true); 

  //Debut blocHeaderCardProduct
  cloneBlocTemplateProduct.getElementById("imageCardProduct").src = productDetailed.imageUrl;
  cloneBlocTemplateProduct.getElementById("titleCardProduct").textContent = productDetailed.name;
  //Fin blocHeaderCardProduct

  //Debut blocDetailedProduct
  cloneBlocTemplateProduct.getElementById("numberOpinionCustomer").textContent = "86 évaluations";
  cloneBlocTemplateProduct.getElementById("descriptionCardProduct").textContent = productDetailed.description;
  
  cloneBlocTemplateProduct.getElementById("priceCardProduct").textContent = productDetailed.price / 100 + ",00" + " " + "€*";
  cloneBlocTemplateProduct.getElementById("titleColorsOption").textContent = "Couleur de personnalisation :";
  cloneBlocTemplateProduct.getElementById("productOptionOne").style.backgroundColor = productDetailed.colors[0];
  cloneBlocTemplateProduct.getElementById("productOptionTwo").style.backgroundColor = productDetailed.colors[1];
  cloneBlocTemplateProduct.getElementById("productOptionThree").style.backgroundColor = productDetailed.colors[2];
  cloneBlocTemplateProduct.getElementById("productOptionFour").style.backgroundColor = productDetailed.colors[3];

  cloneBlocTemplateProduct.getElementById("amountOrderProduct").textContent = "Quantité disirée :";
  cloneBlocTemplateProduct.getElementById("buttonAddCart").textContent = "Ajouter au panier";
  cloneBlocTemplateProduct.getElementById("buttonContinuedBuy").textContent = "Continuer vos achats";
  cloneBlocTemplateProduct.getElementById("buttonBuyProduct").textContent = "Acheter ce produit";
  //Fin blocDetailedProduct

  cloneBlocTemplateProduct.getElementById("informationPriceCardProduct").textContent = "*prix unitaire, tous les prix incluent la TVA."

  document.getElementById("mainProductTeddy").appendChild(cloneBlocTemplateProduct);//fait apparaître le elements en visuel
}


