//Recuperation de l'id de la commande (provenant du serveur) dans le localSotrage
 const responseId = localStorage.getItem("responseId");
 console.log(`responseId : ${responseId}`);

 //Recupreration du prix total de la commande
 const totalPriceFinal = localStorage.getItem("totalPriceFinal");
 console.log(`totalPriceFinal : ${totalPriceFinal}`);

 //Mettre l'id et le prix total de façon dynamique dans le HTML de la page de confirmation
 document.getElementById("idCommand").innerHTML = responseId;
 document.getElementById("priceTotalCommand").innerHTML = totalPriceFinal + " " + "€";

// On vide le localStorage pour recommencer plus tard le processus d'achat
localStorage.clear(); 
// redige à l'acceuil après 10 secondes
window.setTimeout(function() {
    window.location.href = '../html/index.html';
}, 10000);