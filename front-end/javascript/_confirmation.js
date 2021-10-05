//Recuperation de l'id de la commande (provenant du serveur) dans le localSotrage
 const responseId = localStorage.getItem("responseId");
 console.log(`responseId : ${responseId}`);

 //Recupreration du prix total de la commande
 const totalPriceFinal = localStorage.getItem("totalPriceFinal");
 console.log(`totalPriceFinal : ${totalPriceFinal}`);

 //Mettre l'id et le prix total de façon dynamique dans le HTML de la page de confirmation
 document.getElementById("idCommand").innerHTML = responseId;
 document.getElementById("priceTotalCommand").innerHTML = totalPriceFinal + " " + "€";