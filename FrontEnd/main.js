
// URL //
const projetsUrl = "http://localhost:5678/api/works";
const categoriesUrl ="http://localhost:5678/api/categories";


//Call API Projets //
let allProjets = [];
fetch(projetsUrl)
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


// Categories & filters //
fetch(categoriesUrl)
    .then(response => {
        return response.json();
    })
    .then(filters => {
        const filtersContainer = document.querySelector(".categories");
        const filtersList = document.createElement("ul");

        const allProjetsFilter = { id: "all", name: "Tous" };
        filters.unshift(allProjetsFilter); 

        for (let i = 0; i < filters.length; i++) { 
            const filter = filters[i];
            const filterItem = document.createElement("li");
            const filterLink = document.createElement("a");
            filterLink.href = '#';
            filterLink.textContent = filter.name;

            filtersList.appendChild(filterItem);
            filterItem.appendChild(filterLink);

            // Filters style //

            filtersContainer.style.margin= "50px 0px";
            filtersList.style.width = "100%";
            filtersList.style.display = "flex";
            filtersList.style.flexDirection = "row";
            filtersList.style.justifyContent = "center";
            filtersList.style.gap = "15px";
            filtersList.style.margin = "0";
           
            filterItem.classList.add("active");
            filterItem.style.margin = "0px";
            filterItem.style.minWidth ="90px";
            filterItem.style.padding = "10px";
            filterItem.style.color = "#1D6154";
            filterItem.style.textAlign = "center";
            filterItem.style.fontFamily = "Syne";
            filterItem.style.fontSize = "16px";
            filterItem.style.fontStyle ="normal";
            filterItem.style.border = "1px solid";
            filterItem.style.borderRadius ="60px";

            filterLink.classList.add("active");
            filterLink.style.textDecoration = "none"; 
            filterLink.style.color = "#1D6154";

                
            const filtersContainerDiv = document.createElement("div");
            filtersContainerDiv.classList.add("filters-container");
            filtersContainerDiv.appendChild(filtersList);
            filtersContainer.appendChild(filtersContainerDiv);

            //Filters evenListener //
            filterLink.addEventListener("click", () => {
                console.log("Filter name, category and id :", filter.name, ",", filter.id);
                filterProjectsByCategory(filter.id);
                activateFilter(filterItem);
                activateFilterStyle(filterLink);
            
            });

           
        }
    })
    
    .then(data =>{
        console.log("Categories loading OK.");
    })
    .catch(error => console.error("Error loading Categories from API", error));


            //Filter function

    function filterProjectsByCategory(categoryId) {
        if (categoryId === "all") {
            updateGallery(allProjets);
        } else {
            const filteredProjets = allProjets.filter(projet => projet.categoryId === categoryId);
            updateGallery(filteredProjets);
        }
        console.log("Projets filtered.")
    };


        //Filter activation &  desactivation //

    function activateFilter(activeFilterItem){
        const allFilterItems = document.querySelectorAll(".categories li");
        allFilterItems.forEach(item => {
            item.classList.remove("active");
            item.style.backgroundColor = "white";
        });
    
    activeFilterItem.classList.add("active");
    activeFilterItem.style.backgroundColor = "#1D6154";     
    }

    function activateFilterStyle(activeFilterLink) {
        const allFiltersLinks=document.querySelectorAll(".categories a");
        allFiltersLinks.forEach(link => {
            link.classList.remove("active");
            link.style.color = "#1D6154";
    });

    activeFilterLink.classList.add("active");
    activeFilterLink.style.color = "white"; 
    }

    
        // LOGIN //

document.getElementById("nav-login").addEventListener("click", function (){
    //console.log("LOGIN")


})



    