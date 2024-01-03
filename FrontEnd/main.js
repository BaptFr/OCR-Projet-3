
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
        updateModal(data); //Function in the modal part//
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
    }else{
        galleryElement.innerHTML = "";
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
        });
    }
}





// CATEGORIES & FILTERS //
//Filters create elements
function createFilterElement(filter) {
    const filterItem = document.createElement("li");
    const filterLink = document.createElement("a");
    filterLink.href = '#';
    filterLink.textContent = filter.name;
    
    filterItem.appendChild(filterLink);
    filterItem.classList.add("active");
    
    filterLink.classList.add("active");
    filterLink.style.textDecoration = "none";
    filterLink.style.color = "#1D6154";
    //Filters style
    filterItem.style.margin = "0px";
    filterItem.style.minWidth = "90px";
    filterItem.style.padding = "10px";
    filterItem.style.color = "#1D6154";
    filterItem.style.textAlign = "center";
    filterItem.style.fontFamily = "Syne";
    filterItem.style.fontSize = "16px";
    filterItem.style.fontStyle = "normal";
    filterItem.style.border = "1px solid";
    filterItem.style.borderRadius = "60px";
    // Filters eventListener
    filterLink.addEventListener("click", () => {
        console.log("Filter name :", filter.name, ", category and id :", filter.id);
        filterProjectsByCategory(filter.id);
        activateFilter(filterItem);
        activateFilterStyle(filterLink);
    });
    return filterItem;
}

//Filters Container    
const filtersContainer = document.querySelector(".categories");
const filtersList = document.createElement("ul");
filtersContainer.style.margin = "51px 0px 0px 0px";
filtersList.style.width = "100%";
filtersList.style.display = "flex";
filtersList.style.flexDirection = "row";
filtersList.style.justifyContent = "center";
filtersList.style.gap = "10px";
filtersList.style.margin = "0";
    
//FETCH API & DOM add
fetch(baseUrl + "/api/categories")
    .then(response => response.json())
    .then(filters => {
        const allProjetsFilter = { id: "all", name: "Tous" };
        filters.unshift(allProjetsFilter);
        filters.forEach(filter => {
            const filterItem = createFilterElement(filter);
            filtersList.appendChild(filterItem);
        });
        const filtersContainerDiv = document.createElement("div");
        filtersContainerDiv.classList.add("filters-container");
        filtersContainerDiv.appendChild(filtersList);
        filtersContainer.appendChild(filtersContainerDiv);
    })
    .catch(error => console.error("Error loading Categories from API", error));

//Filters use function
function filterProjectsByCategory(categoryId) {

    const projects = document.querySelectorAll(".gallery .project");
    if (categoryId === "all") {
        updateGallery(allProjets);
    } else {
    const filteredProjets = allProjets.filter(projet => projet.categoryId === categoryId);
    updateGallery(filteredProjets);
    };
    console.log("Projets filtered.")
};


// Filter activation &  desactivation 
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

//NAVBAR Hypertext Login link//
const login = document.getElementById("nav-login");
login.addEventListener("click", () => {
    window.location.href = "login.html";
});


// EDIT VERSION AFTER LOGIN//
//After connection 
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("loginSuccess") === 'true') {
        console.log("Login Edit mode access");
        editVersStyle();
    }
});
// EDIT VERS style  //
function editVersStyle() {
    editVersBanner();
    navbarEditVers();
    filtersEditVers ();
    modalEditLinks (); 
    console.log("Modifs OK (RAPPEL MODIFS) "); //----------A SUPPR    ---------//
    //editGalleryMod
}
//EDIT VERS Banner //
const projetId = 123
function editVersBanner (){
    const editBandDiv= document.querySelector(".editBand");
        editBandDiv.style.backgroundColor = "#000000";
        editBandDiv.style.color ="#FFFFFF";
        editBandDiv.style.height = "59px";
        editBandDiv.style.width = "1440px";
        editBandDiv.style.marginLeft = "-150px";
        editBandDiv.style.marginBottom = "-12px";
        editBandDiv.style.display ="flex";
        editBandDiv.style.justifyContent = "center";
        editBandDiv.style.alignItems ="center";
        editBandDiv.style.gap ="11.5px";

    const editBandLogo = document.createElement("i");
        editBandLogo.classList.add("fa-regular", "fa-pen-to-square");

    const editBandTitle = document.createElement("a");
        editBandTitle.textContent = "Mode édition"
        editBandTitle.style.fontSize ="16px";
        editBandTitle.style.display = "inline-block"; 
        editBandTitle.style.lineHeight = "4"; 

    editBandDiv.appendChild(editBandLogo);
    editBandDiv.appendChild(editBandTitle);   
}

//EDIT VERS Navbar logout//
function navbarEditVers (){
    const logout = document.getElementById("nav-login");  
    logout.textContent = "Logout";
    login.removeEventListener("click", login);
    login.addEventListener("click", logoutRedirection);
}
//Logout redirection//
function logoutRedirection (){
    localStorage.removeItem("loginSuccess"); 
    window.location.href = "index.html";
}
//EDIT VERS Categories//
function filtersEditVers () {
    const hideCategories = document.querySelector(".categories")
    const galleryStyle = document.querySelector(".gallery")
    hideCategories.style.display = "none";
    galleryStyle.style.marginTop = "92px";

}


//EDIT VERS Gallery links & Modal opeening/closing//
//Modal links
function modalEditLinks(){   
    let modal = null;
    const editPosition = document.querySelector(".projets-title");
    const editLogo = document.createElement("img");
        editLogo.src = "assets/icons/group.png";
        editLogo.alt = "logo-edit";
        editLogo.href ="#modal1";
        editLogo.classList.add("js-modal");
        editLogo.style.margin = "7px 10px 0px 31px";
        
    const editLink = document.createElement("a");
        editLink.textContent = "modifier" ; 
        editLink.href ="#modal1";
        editLink.classList.add("js-modal");
        editLink.style.margin ="11px 0px 0px 0px";

    const editStyle = document.querySelector(".projets-title");
        editStyle.style.display = "flex";
        editStyle.style.justifyContent ="center";
        editStyle.style.flexDirection ="row";
        editStyle.style.alignItems ="flex-start";
        editStyle.style.margin = " 30px 0px 0px 110px";
        editStyle.style.height = "30px"

    editPosition.appendChild(editLogo);
    editPosition.appendChild(editLink);

    //Modal opening/closing
    const openModal = function(e) {   
        e.preventDefault ();
        const target = document.querySelector(e.target.getAttribute("href"));
        target.style.display = "flex";
        overlay.style.display = "block";
        target.removeAttribute("aria-hidden");
        target.setAttribute("aria-modal", "true");
        modal = target;
        e.stopPropagation();
        document.body.addEventListener("click", closeModal);
        document.querySelector(".modal1-button").addEventListener("click", addProjetModal); //Add Projet Listener
        modal.querySelector(".modal-close").addEventListener("click", closeModal);
        modal.querySelector(".projets-modal").addEventListener("click", stopPropagation); 
        console.log("Opening modal")
    }

    const closeModal = function(e){
        if (modal === null) return;
        e.preventDefault();
        modal.style.display = "none";
        overlay.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("aria-modal");
        document.body.removeEventListener("click", closeModal);
        modal.querySelector(".modal-close").removeEventListener("click", closeModal);
        modal.querySelector(".projets-modal").removeEventListener("click", stopPropagation);
        modal = null;  
        console.log("Closing modal"); 
    };

    const stopPropagation = function(e){
        e.stopPropagation()
    }

    window.addEventListener("keydown", function(e) {
        if(e.key === "Escape" || "Esc"){
            closeModal(e)
        }
    });
    editLogo.addEventListener("click", openModal);
    editLink.addEventListener("click", openModal);
}

//ADD PROJET //  CHANGEMENT D'emplacement ?? !!!!!!!!!!!!!!!!!!!!!
//Add Projet modal 
function addProjetModal() {
    //Style
    document.querySelector(".modal1-gallery").style.display = "none";
    document.getElementById("modal1-title").textContent ="Ajout photo";
    const addModal2Button = document.querySelector(".modal1-button");
    addModal2Button.style.backgroundColor = "#A7A7A7";
    addModal2Button.textContent = "Valider";

}

// FUNCTION Modal Projets gallery //
function updateModal(apiProjets){
    const galleryModal = document.querySelector(".modal1-gallery");
    if (!galleryModal) {
        console.error("API Projets datas unfound.");
       return;
    }else{
        galleryModal.innerHTML = "";
        apiProjets.forEach(item => {
            const imageModalContainer = document.createElement("div");
            imageModalContainer.classList.add("image-modal-container");

            const imageElement = document.createElement("img");
            imageElement.src = item.imageUrl; 
            imageElement.alt = item.title;

            const trashLogo= document.createElement("i");//Delete icon
            trashLogo.classList.add('fa-solid', 'fa-trash-can');

            imageModalContainer.appendChild(imageElement);
            imageModalContainer.appendChild(trashLogo);
            galleryModal.appendChild(imageModalContainer);

            //trashLogo.addEventListener("click", deleteElement);//Delete listener

            console.log("API loading MODAL rojets gallery OK.");
        });
    }
}


//DELETE Projet//
/*function deleteElement(){
    fetch(baseUrl + "/api/XXX/{id}")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network error or server problems");
        }
        return response.json();
    })
    .then(data => {
        allProjets = data;
        console.log("Projets gallery Api new datas: ", allProjets);
        updateGallery(data);
        updateModal(data); //Function in the modal part//
    })
    .catch(error => {
        console.error("API Projets delete data return error", error);
    });
}
*/


