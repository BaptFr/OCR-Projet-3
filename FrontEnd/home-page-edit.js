
// URL //
const baseUrl = "http://localhost:5678";

//Call API Projets //
let allProjets = [];
fetch(baseUrl + "/api/works")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network error or server problems");
        }
        return response.json();
    })
    .then(data => {
        allProjets = data;
        console.log("Projets gallery Api  datas: ", allProjets);
        updateGallery(data);
    })
    .catch(error => {
        console.error("API Projets data return error", error);
    });


// Function Projets gallery  //
function updateGallery(apiProjets) {
const galleryElement = document.querySelector(".gallery");

if (!galleryElement) {
    console.error("API Projets datas unfound.");
    return;
}

else{

galleryElement.innerHTML = '';

apiProjets.forEach(item => {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    const imageElement = document.createElement("img");
    imageElement.src = item.imageUrl; 
    imageElement.alt = item.title; 

    const titleElement = document.createElement("p");
    titleElement.classList.add("title");
    titleElement.textContent = item.title;

    imageContainer.appendChild(imageElement);
    imageContainer.appendChild(titleElement);
    galleryElement.appendChild(imageContainer);

    console.log("API loading Projets gallery OK.");
});}
}

const projetsEditLink = document.querySelector(".projets-edit");

const logoProjetsEdit = document.createElement ("img");
logoProjetsEdit.src = "./assets/icons/group.png";
logoProjetsEdit.href="#";

const projetsEdit = document.createElement("a");
projetsEdit.textContent = "modifier";
projetsEdit.href = "#";

projetsEditLink.appendChild(logoProjetsEdit);
projetsEditLink.appendChild(projetsEdit);

















    //Navbar//
document.getElementById("nav-logout").addEventListener("click", function (){
    window.location.href = "index.html";
});

    
 
    