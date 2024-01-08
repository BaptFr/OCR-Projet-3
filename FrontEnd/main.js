
// URL //
const baseUrl = "http://localhost:5678";


//Call API Projets //
let allProjets = [];
function loadProjetsAndRefreshGallery () {
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
        updateModal(data); //Function for Modal1 //
    })
    .catch(error => {
        console.error("API Projets data return error", error);
    });
}
loadProjetsAndRefreshGallery ()


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
    filterLink.href = "#projets";
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
    filterItem.style.cursor = "pointer";
    // Filters eventListener
    filterItem.addEventListener("click", () => {
        console.log("Filter name :", filter.name, ", category and id :", filter.id);
        var projetsSection = document.getElementById("projets");
        projetsSection.scrollIntoView();
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


//Filters activation &  desactivation 
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
    if (localStorage.getItem("loginSuccess") === "true") {
        console.log("Login Edit mode access");
        editVersStyle();
    }
});
//EDIT VERS style  //
function editVersStyle() {
    editVersBanner();
    navbarEditVers();
    filtersEditVers ();
    modalEditLinks (); 
}
//EDIT VERS Banner //

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
//EDIT VERS Navbar Logout redirection//
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


//EDIT VERS Gallery links + Modal opening & closing//
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
        editStyle.style.height = "30px";

    editPosition.appendChild(editLogo);
    editPosition.appendChild(editLink);

    

    //Modal1 opening & closing
    
    const openModal = function(e) {
        
        e.preventDefault ();
        const target = document.querySelector(e.target.getAttribute("href"));
        target.style.display = "flex";
        overlay.style.display = "block";
        target.removeAttribute("aria-hidden");
        target.setAttribute("aria-modal", "true");
        document.getElementById("modal1-button").style.display = "block";
        document.getElementById("modal2-button").style.display = "none";
        modal = target;
        e.stopPropagation();
        document.body.addEventListener("click", closeModal);
        document.getElementById("modal1-button").addEventListener("click", addProjetModal); //Add Projet Listener(Modal2)
        modal.querySelector(".modal-close").addEventListener("click", closeModal);
        modal.querySelector(".projets-modal").addEventListener("click", stopPropagation); 
        console.log("MODAL 1 opening")
        console.log("Loading MODAL gallery Projets from API OK.");
    }

    const closeModal = function(e){
        if (modal === null) return;
        e.preventDefault();
        modal.style.display = "none";
        overlay.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("aria-modal");
        document.body.removeEventListener("click", closeModal);
        document.getElementById("modal1-button").removeEventListener("click", addProjetModal);
        modal.querySelector(".modal-close").removeEventListener("click", closeModal);
        modal.querySelector(".projets-modal").removeEventListener("click", stopPropagation);
        modal = null;  
        console.log("Closing modal");

    };

    const stopPropagation = function(e){
        e.stopPropagation()
    }

    window.addEventListener("keydown", function(e) {
        if(e.key === "Escape" || e.key === "Esc"){
            closeModal(e);
        }else{
        }
    });

    editLogo.addEventListener("click", openModal);
    editLink.addEventListener("click", openModal);

}
    


// FUNCTION Modal1 Projets gallery //
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

            const trashLogo= document.createElement("i");//Delete Projet icon & listener
            trashLogo.classList.add("fa-solid", "fa-trash-can");
            imageModalContainer.appendChild(imageElement);
            imageModalContainer.appendChild(trashLogo);
            galleryModal.appendChild(imageModalContainer);
            

            trashLogo.addEventListener("click", () => {
                deleteElement(item.id)
            });
               
        });
    }
};

// DELETE PROJET function Modal1//
function deleteElement(projectIdDelete) {
    const userConfirmed = window.confirm("Voulez-vous vraiment supprimer le projet ?");
    const token = localStorage.getItem("token");

    if (userConfirmed) {
        fetch(baseUrl + "/api/works/" + projectIdDelete, {
            method: "DELETE",
            headers: {
                accept: "*/*",
                "Authorization": "Bearer " + token,
            },
        })
        .then(response => {
            if (response.ok) {
                console.log("Projet DELETING SUCCESS");
                alert("Projet supprimé");
                fetch(baseUrl + "/api/works")
                    .then(response => response.json())
                    .then(data => updateModal(data))
                    .catch(error => console.error("Error update Modal gallery projects (fetch)", error));
                loadProjetsAndRefreshGallery();
            } else {
                console.error("Error deleting Projet: " + response.status);
                return response.json();
            }  
            
        })
        .catch(error => {
            console.error("Error deleting Projet", error);
            alert("Une erreur est survenue lors de la suppression du projet.");
        });
    } else {
        console.log("Projet deleting canceled by user");
    }
    
};


// ADD NEW PROJET //  
//Modal2 : Add Projet modal//
function addProjetModal() {
    //Selectors for const 
    console.log("MODAL2 opening - Add projet")
    document.getElementById("modal1-button").style.display = "none";
    document.getElementById("modal2-button").style.display = "block";
    const modal2Title = document.getElementById("modal1-title");
    const modal2Content = document.querySelector(".modal2-content");
    const addModal2Button = document.getElementById("modal2-button");
    const addPicture = document.getElementById("modal2-picture-add-button");
    const fileInput = document.getElementById("file-input");
    const loadedPictureChange = document.querySelector(".loaded-picture-change");
    const titreInput = document.getElementById("titre");
    const categorieSelect = document.getElementById("categorie-select");
  

    //Modal2 style (add Projet modal style)
    document.querySelector(".modal").style.backgroundColor = "#FFFFFF";
    document.querySelector(".modal1-gallery").style.display = "none";
    modal2Content.style.display ="flex";
    modal2Title.textContent ="Ajout photo";
    modal2Title.style.left="250px";
    addModal2Button.disabled = true;
    addModal2Button.style.backgroundColor = "#A7A7A7";
    addModal2Button.style.cursor = "auto";
    addModal2Button.textContent = "Valider";
    addModal2Button.style.right = "195px";

    //Category selection
    fetch(baseUrl + "/api/categories")
    .then(response => response.json())
    .then(data => {
      const categorieSelect = document.getElementById("categorie-select");
      const emptyOption = { id: 0, name: "" };
      data.unshift(emptyOption);
      data.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id; 
        option.textContent = category.name; 
        categorieSelect.appendChild(option);
      });
    })
    .catch(error => console.error("API category loading error", error));
    

    //Modal2 listeners
    titreInput.addEventListener("change", function(){
        conditionsConfirmationButton();
    });
    categorieSelect.addEventListener("change",function(){
        conditionsConfirmationButton();
    });
    addPicture.addEventListener("click", function(){
        fileInput.click();
    });
    

    //Picture modal integration
    fileInput.addEventListener("change", function (){
        if (fileInput.files.length > 0) {
            const selectedFile = fileInput.files[0];
            const reader = new FileReader();
            console.log("Fichier sélectionné :", selectedFile);

            reader.onload = function(e) {
                const imgAdded =document.createElement("img");
                imgAdded.src = e.target.result;
                imgAdded.alt ="Image sélectionnée";
                imgAdded.style.maxWidth = "129px";
                imgAdded.style.maxHeight = "169px";

                loadedPictureChange.innerHTML = '';
                loadedPictureChange.appendChild(imgAdded);

                conditionsConfirmationButton();
            };
            reader.readAsDataURL(selectedFile);
        }
        console.log("New Projet picture added"); // CONSOLELOG VERIF
        
    });

    // Add Projet modal enable button  "Valider"
    function conditionsConfirmationButton(){
        const titreValue = titreInput.value.trim();  
        const categorieValue = categorieSelect.value.trim();

        if (titreValue !=="" && categorieValue !== "" &&fileInput.files.length > 0){
            addModal2Button.style.backgroundColor = "#1D6154";
            addModal2Button.disabled = false;
            addModal2Button.style.cursor = "pointer";
            console.log("Add project VALIDATION BUTTON unlocked")
        }else{
            addModal2Button.style.backgroundColor = "#A7A7A7";
            addModal2Button.disabled = true;
            addModal2Button.style.cursor = "auto";
            }
    }

    // API POST new Projet fetch   /////RESTE SUR LA MODAL 2
    addModal2Button.addEventListener("click", function (event) {
        event.preventDefault();
        const titreValue = titreInput.value.trim();
        const categorieValue = categorieSelect.value.trim();
        const selectedFile = fileInput.files[0];

        if (!selectedFile) {
            console.error("No picture selected.");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("title", titreValue);
        formData.append("category", categorieValue);
        const token = localStorage.getItem("token");
   
        if (!token) {
            console.error("Unfound token in the localStorage.");
            return;
        }

        fetch(baseUrl +"/api/works", {
            method: "POST",
            body: formData,
            headers:{
                "Authorization": "Bearer " + token,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur: ${response.status} - ${response.statusText}`);
            }
            return response.json();
                })
        .then(data => {
            console.log("Projet ADDED SUCCESS", data);
            if (data !== null) {
                alert("Le projet a bien été ajouté.");

                loadProjetsAndRefreshGallery();
                const closeButton = document.querySelector(".modal-close");
                const clickClose = new Event("click");
                closeButton.dispatchEvent(clickClose);
            } else { 
                console.error("Error adding Projet: Unexpected response", data);
                alert("Une erreur est survenue lors de l'ajout du projet.");
            };
        })
        .catch(error => {
            console.error("Projet ADDED ERROR:", error);
        });
    });
};


    

