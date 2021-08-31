main();

async function main() {
  const products = await getProducts();
  for (product of products) {
    displayProduct(product);
  }
}

function getProducts() {
  return fetch("http://localhost:3000/api/teddies")
    .then(function (httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function (products) {
      return products;
    })
    .catch(function (error) {
      alert(error);
    });
}

function displayProduct(product) {
  const copyblocTemplateProducts = document.getElementById("blocTemplateProducts")
  const cloneblocTemplateProducts = document.importNode(copyblocTemplateProducts.content, true)

  cloneblocTemplateProducts.getElementById("linkCardProduct").href = "_oriproductteddy.html?id=" + product._id
  cloneblocTemplateProducts.getElementById("imageCardProduct").src = product.imageUrl;
  cloneblocTemplateProducts.getElementById("titleCardProduct").textContent = product.name
  cloneblocTemplateProducts.getElementById("priceCardProduct").textContent = product.price / 100 + "€"

  document.getElementById("blocPageTeddies").appendChild(cloneblocTemplateProducts)
}

/*function displayProduct(product) {
  document.getElementById(
    "blocPageTeddies"
  ).innerHTML += `<section id="blocSectionProducts">
    <article id="blocCardProduct">
      <a id="linkCardProduct" href="_oriproductteddy.html?id=" + product._id>
        <figure id="figureCardProduct">
          <img id="imageCardProduct" src="${product.imageUrl}" >
        </figure>
        <div class="detailsCardProduct">
          <h2 id="titleCardProduct">${product.name}</h2>
          <p id="priceCardProduct">${product.price / 100 + "€"}</p>
        </div>
      </a>
    </article>
  </section>`;
}*/
