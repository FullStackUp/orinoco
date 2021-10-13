//function main pour contenir le code de base
main();

async function main() {//function en async pour pouvoir excuter un await
  const articles = await getArticles();// await = attendre que la promesse soit résolu 
  for (article of articles) {//une boucle of pour prendre tous les produits(articles)
    displayProduct(article);
  }

  console.log(articles);
}

function getArticles() {
  return fetch("http://localhost:3000/api/teddies")
    .then(function (httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function (articles) {
      return articles;
    })
    .catch(function (error) {//si j'ai une erreur c'est le bloc catch qui affichera un message
      alert(error);
      alert(`WARNING information : veuillez vous connecter au serveur "port 3000" ou activer javascript`);
    });
}

//recuperation du template html + le cloner + récuperer ses valeurs
  function displayProduct(article) {
  const copyBlocTemplateArticles = document.getElementById("blocTemplateArticles");
  const cloneBlocTemplateArticles = document.importNode(copyBlocTemplateArticles.content, true);

  cloneBlocTemplateArticles.getElementById("linkCardArticle").href += `?id=${article._id}`;//lien en concaténation qui conduit vers la fiche individuelle d'un produit
  cloneBlocTemplateArticles.getElementById("imageCardArticle").src = article.imageUrl;
  cloneBlocTemplateArticles.getElementById("imageCardArticle").alt = article.description;
  cloneBlocTemplateArticles.getElementById("titleCardArticle").textContent = article.name;
  cloneBlocTemplateArticles.getElementById("priceCardArticle").textContent = article.price / 100 + "€";

  document.getElementById("mainArticlesTeddies").appendChild(cloneBlocTemplateArticles);
}