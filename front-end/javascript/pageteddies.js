getTeddiesProducts = () => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (
        this.readyState == XMLHttpRequest.DONE &&
        this.status >= 200 &&
        this.status < 400
      ) {
        resolve(JSON.parse(this.responseText));
        console.log("Connecté");
      } else {
      }
    };
    request.open("GET", "http://localhost:3000/api/teddies/");
    request.send();
  });
};

// Mise en place des éléments pour construire la page //
async function teddiesList() {
  const teddiesList = await getTeddiesProducts();

  // Ajout de la liste des produits //
  let productsList = document.getElementById("blocSectionProducts");

  // Ajout de la article dans le HTML //
  teddiesList.forEach((teddies) => {
    let productsBox = document.createElement("article");
    productsBox.setAttribute("class", "teddiesProducts");

    let productsImg = document.createElement("div");
    productsImg.setAttribute("class", "teddiesPicture");

    let productsDetails = document.createElement("div");
    productsDetails.setAttribute("class", "teddiesDetails");

    let productPic = document.createElement("img");
    productPic.setAttribute("src", teddies.imageUrl);
    productPic.setAttribute("alt", "Photo de nounours");

    let productName = document.createElement("h2");
    productName.setAttribute("class", "teddiesNom");
    productName.textContent = teddies.name;

    let productDestription = document.createElement("p");
    productDestription.setAttribute("class", "teddiesDescription");
    productDestription.textContent = teddies.description;

    let productPrice = document.createElement("p");
    productPrice.setAttribute("class", "teddiesPrix");
    productPrice.textContent = teddies.price / 100 + ",00" + " €";

    let teddiesLink = document.createElement("a");
    teddiesLink.setAttribute("href", "produit.html?id=" + teddies._id);
    teddiesLink.setAttribute("class", "btnBuy");
    teddiesLink.textContent = "Acheter";

    // Noeuds //
    productsList.appendChild(productsBox);
    productsBox.appendChild(productsImg);
    productsImg.appendChild(productPic);
    productsBox.appendChild(productsDetails);
    productsDetails.appendChild(productName);
    productsDetails.appendChild(productDestription);
    productsDetails.appendChild(productPrice);
    productsDetails.appendChild(teddiesLink);
  });
}

teddiesList();

// Récupération de l'objet dans le localstorage et conversion //
let cards = JSON.parse(localStorage.getItem("panier"));

// Affichage du nombre d'articles dans le panier //
function showItems() {
  let cardsItems = document.getElementById("indexPanier");
  if (cards != null) {
    cartItems.textContent = cards.length;
  } else {
    cardsItems.textContent = 0;
  }
}
showItems();
