
// URL //
const baseUrl = "https://sophie-bluel-portfolio.onrender.com";


//CALL API Projets //
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
        updateModal1(data); //Function for Modal1 //
    })
    .catch(error => {
        console.error("API Projets data return error", error);
    });
};
loadProjetsAndRefreshGallery ();


// GALLERY //
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
//Filters style creation
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
    //Filters eventListener selection
    filterItem.addEventListener("click", () => {
        console.log("Filter name :", filter.name, ", category and id :", filter.id);
        var projetsSection = document.getElementById("mes-projets-title");
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
    
//Categories fetch API & DOM add
fetch(baseUrl + "/api/categories")
    .then(response => response.json())
    .then(filters => {
        const allProjetsFilter = { id: "all", name: "Tous" }; //New filter add
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
    if (categoryId === "all") {
        updateGallery(allProjets);
    } else {
    const filteredProjets = allProjets.filter(projet => projet.categoryId === categoryId);
    updateGallery(filteredProjets);
    };
    console.log("Projets filtered.")
};


//Filters activation & desactivation 
function activateFilter(activeFilterItem){
    const allFilterItems = document.querySelectorAll(".categories li");
    allFilterItems.forEach(item => {
        item.classList.remove("active");
        item.style.backgroundColor = "white";
        });
    activeFilterItem.classList.add("active");
    activeFilterItem.style.backgroundColor = "#1D6154";     
};

function activateFilterStyle(activeFilterLink) {
    const allFiltersLinks=document.querySelectorAll(".categories a");
    allFiltersLinks.forEach(link => {
        link.classList.remove("active");
        link.style.color = "#1D6154";
    });
    activeFilterLink.classList.add("active");
    activeFilterLink.style.color = "white"; 
};

//NAVBAR Hypertext Login link//
const login = document.getElementById("nav-login");
login.addEventListener("click", () => {
    window.location.href = "login.html";
});


// EDIT HOMEPAGE VERSION AFTER LOGIN//
//After connection login success
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("loginSuccess") === "true") {
        console.log("LOGIN Edit mode access");
        editVersStyle();
    }
});

//EDIT VERS style  
function editVersStyle() {
    editVersBanner();
    navbarEditVers();
    filtersEditVers ();
    modalEditLinks (); 
}

//EDIT VERS Banner 
function editVersBanner (){
    const editBandDiv= document.querySelector(".editBand");
        editBandDiv.style.backgroundColor = "#000000";
        editBandDiv.style.color ="#FFFFFF";
        editBandDiv.style.height = "59px";
        editBandDiv.style.width = "100vw";
        editBandDiv.style.marginLeft = "calc(-1 * ((100vw - 100%) / 2))";
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
};

//EDIT VERS Navbar logout
function navbarEditVers (){
    const logout = document.getElementById("nav-login");  
    logout.textContent = "logout";
    login.removeEventListener("click", login);
    login.addEventListener("click", logoutRedirection);
};
//EDIT VERS  Logout redirection
function logoutRedirection (){
    localStorage.removeItem("loginSuccess"); 
    window.location.href = "index.html";
    console.log("LOGOUT DONE")
};
//EDIT VERS Categories
function filtersEditVers () {
    const hideCategories = document.querySelector(".categories")
    const galleryStyle = document.querySelector(".gallery")
    hideCategories.style.display = "none";
    galleryStyle.style.marginTop = "92px";
};


//EDIT VERS Gallery links + Modal opening & closing//
//Modal links
function modalEditLinks(){   
    const editPosition = document.querySelector(".projets-title");    
        editPosition.style.display = "flex";
        editPosition.style.justifyContent ="center";
        editPosition.style.alignItems ="center";
        editPosition.style.flexDirection = "center";
        editPosition.style.margin = " 50px 0px 0px 110px";
        editPosition.style.height = "30px";

    const editLogo = document.createElement("img");
        editLogo.src = "assets/icons/group.png";
        editLogo.classList.add("js-modal1");
        editLogo.alt = "logo-edit";
        editLogo.style.margin = "0px 10px 0px 31px";
        editLogo.style.cursor = "pointer";
        
        
        
    const editLink = document.createElement("a");
        editLink.textContent = "modifier" ; 
        editLink.href ="#modal1";
        editLink.classList.add("js-modal1");
        editLink.style.margin =  "5px 0px 0px 0px";



    editPosition.appendChild(editLogo);
    editPosition.appendChild(editLink);
    const elementsListener = [editLogo, editLink];
    elementsListener.forEach(element => 
    element.addEventListener("click", openModal));
};


//OPEN MODAL function//  
let modal = null;
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");

const openModal = function(e) {
    e.preventDefault();
    const clickedElement= e.target ;     
    if (clickedElement.classList.contains("js-modal1")) {
        modal = modal1;
        modal2.style.display = "none";
        modal2.setAttribute("aria-hidden", "true");
        modal2.removeAttribute("aria-modal");   
        modal1.style.display = "flex";
        modal1.removeAttribute("aria-hidden");
        modal1.setAttribute("aria-modal", "true");
        overlay.style.display = "block";
    
        console.log("Modal 1 -OPENED");
        } else if (clickedElement.classList.contains("js-modal2")) {
        //Modal2 revealed & modal 1 hidden
        modal = modal2;
        modal1.style.display = "none";
        modal1.setAttribute("aria-hidden", "true");
        modal1.removeAttribute("aria-modal");
        overlay.style.display = "block";
        modal2.style.display = "flex";
        modal2.removeAttribute("aria-hidden");
        modal2.setAttribute("aria-modal", "true");
        overlay.style.display = "block";
        loadedPicturePlace.style.display= "flex";
        //Modal 2 form function
        addProjetModal();
        console.log("Modal 2 - OPENED.");   
        }
    else {
        console.error("Element with the specified selector unfound DOM", error);
    };
    //Common to modals
    overlay.style.display = "block";
    e.stopPropagation();
};


//OPEN MODAL & back eventListener//
//Event listener loop
const modalSelect = document.querySelectorAll(".js-modal1, .js-modal2");
modalSelect.forEach(select => {
    select.addEventListener("click", function(e) {
        closeModal();
        openModal(e);
        e.stopPropagation();
    });
});


//CLOSE MODAL//
//Function
const closeModal = function() {
    if (modal) {
        modal.style.display = "none";
        overlay.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("aria-modal");
        if(modal1){
            updateGallery;
            loadProjetsAndRefreshGallery ()
        }
    if(modal2){
        resetModal2Form();
        clearFileInput()
    };
        modal = null;
        console.log("Modal - CLOSED.");
    };
};
//CLOSE modal eventListeners
document.addEventListener("click", function (e) {
    if (modal && !modal.contains(e.target) && e.target !== modal) {
        closeModal();
    }
});
window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && modal) {
        closeModal();
    }
});
document.querySelectorAll(".modal-close").forEach(closeButton => {
    closeButton.addEventListener("click", closeModal);
});


// MODAL 1  Projets gallery //
function updateModal1(apiProjets){
    const galleryModal = document.querySelector(".modal1-gallery");
    
    galleryModal.innerHTML = "";
    if (!galleryModal) {
        console.error("API Projets datas unfound.");
       return;
    }else{

        apiProjets.forEach(item => {
            const imageModalContainer = document.createElement("div");
            imageModalContainer.classList.add("image-modal-container");

            const imageElement = document.createElement("img");
            imageElement.src = item.imageUrl; 
            imageElement.alt = item.title;

            const trashLogo= document.createElement("i");//Delete Projet: icon & listener
            trashLogo.classList.add("fa-solid", "fa-trash-can");
            imageModalContainer.appendChild(imageElement);
            imageModalContainer.appendChild(trashLogo);
            galleryModal.appendChild(imageModalContainer);
            

            trashLogo.addEventListener("click", () => {
                deleteElement(item.id)
            
            });
           console.log("Modal 1 - Gallery updated");    
        });
    }
};

//DELETE PROJET on Modal1//
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
                    .then(data => updateModal1(data))
                    .catch(error => console.error("Error update Modal gallery projects (fetch)", error));
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
    //Selectors for const. 
const addModal2Button = document.getElementById("modal2-button"); //Validation button
const addPictureButton = document.getElementById("modal2-picture-add-button");//Add picture button
const loadedPictureChange = document.querySelector(".loaded-picture-change");//Add picture button & input place
const loadedPicturePlace = document.querySelector(".loaded-picture-place");//Integration picture place
//Form inputs 
const titreInput = document.getElementById("titre");
const categorieSelect = document.getElementById("categorie");
const fileInput = document.getElementById("file-input") 

    //Funtction add Projet
function addProjetModal() {
    //Refresh pict visual
    loadedPicturePlace.innerHTML = "";
    loadedPictureChange.style.display = "flex";

    //Modal 2 ADD PROJET Category selection choice 
fetch(baseUrl + "/api/categories")
.then(response => response.json())
.then(data => {
    //No category selection cumulation
    while (categorieSelect.firstChild) {
    categorieSelect.removeChild(categorieSelect.firstChild);
    };
    //Form category selection choice
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

    //Modal2 ADD PROJET Disabled validation button 
addModal2Button.disabled = true;
addModal2Button.style.backgroundColor = "#A7A7A7";
addModal2Button.style.cursor = "auto";
};

//ADD PROJET form listeners 
addPictureButton.addEventListener("click", handleAddPictureClick);
function handleAddPictureClick(event) { 
    event.preventDefault();
    console.log("Click DETECTE SUR ADD PICTURE BUTTON RENVOI AU CLICK de FILE INPUT", event);
    fileInput.click();
  addPictureButton.removeEventListener("click", handleAddPictureClick);
  addPictureButton.addEventListener("click", handleAddPictureClick);
};

fileInput.addEventListener("change", function(event) {
    console.log("File input CHANGE DETETCTE = enchaine sur la picture integration.", event);
    pictureIntegration(); 
    fileInput.removeEventListener("change", pictureIntegration);
    fileInput.addEventListener("change", pictureIntegration);
});

titreInput.addEventListener("change", function(){
    conditionsConfirmationButton(); 
    titreInput.removeEventListener("change", conditionsConfirmationButton);  
});

categorieSelect.addEventListener("change", function(){
    conditionsConfirmationButton(); 
    categorieSelect.removeEventListener("change", conditionsConfirmationButton);  
});


//Modal 2 Picture integration file input(add Projet Form)
function pictureIntegration(){
    //Selected picture modal2 integration
    if (fileInput.files.length > 0) { 
        const selectedFile = fileInput.files[0];
        const reader = new FileReader();
        console.log("Selected:", selectedFile);
        // Vérification de la taille du fichier (4 Mo maximum)
        if (selectedFile.size > 4 * 1024 * 1024) {
            console.error("PICTURE SIZE exceeds limits (4mo).");
            alert("La taille de l'image ne doit pas dépasser 4 Mo.","color: red; font-weight: bold;");
            return;
        }
        reader.onload = function(e) {
            const imgAdded = document.createElement("img");
            imgAdded.src = e.target.result;
            imgAdded.alt ="Image sélectionnée";
            imgAdded.style.maxWidth = "129px";
            imgAdded.style.maxHeight = "169px";
            loadedPictureChange.style.display= "none";
            loadedPicturePlace.appendChild(imgAdded); 
            conditionsConfirmationButton();
        };
        reader.readAsDataURL(selectedFile);
    }
    console.log("New Projet picture added");
};


//  Enable conditions button "Valider"
function conditionsConfirmationButton(){
    const titreValue = titreInput.value.trim();  
    const categorieValue = categorieSelect.value.trim();
    
    
    if (titreValue !=="" && categorieValue !== "" && fileInput.files.length > 0){
        addModal2Button.style.backgroundColor = "#1D6154";
        addModal2Button.disabled = false;
        addModal2Button.style.cursor = "pointer";
        console.log("Add project VALIDATION BUTTON unlocked")
    }else{
        addModal2Button.style.backgroundColor = "#A7A7A7";
        addModal2Button.disabled = true;
        addModal2Button.style.cursor = "auto";
    }
};


    
// API POST NEW PROJET//
//Fetch 
addModal2Button.addEventListener("click", function (event) {
     event.preventDefault();
    const titreValue = titreInput.value.trim();
    const categorieValue = categorieSelect.value.trim()
    const maxLengthTitle = 30;
    //File verification
    let selectedFile = fileInput.files[0];
    if (!selectedFile) {
        console.error("No picture selected.");
        return;
    }
    //Error title length
    if(titreValue.length > maxLengthTitle){
        console.error("Titre length >30")
        alert("Veuillez limiter le titre à 30 caractères")
        return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", titreValue);
    formData.append("categoryId", categorieId);
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Unfound token in the localStorage.");
        return;
    }

    fetch(baseUrl +"/api/works", {
        method: "POST",
         headers:{
            Authorization: `Bearer ${token}`
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur: ${response.status} - ${response.statusText}`);
        }
        return response.json();
            })
    .then(data => {
        if (data !== null) {
            alert("Le projet a bien été ajouté.");//User add success alert
            console.log("Projet ADDED SUCCESS", data);
            closeModal();
        } else {
            console.error("Error adding Projet: Unexpected response", data);
            alert("Une erreur est survenue lors de l'ajout du projet.");//User add error alert
        };
    })
    .catch(error => {
         console.error("Projet ADDED ERROR:", error);
    });
});


//Modal2  Form reset/
//Use in closeModal
function resetModal2Form() {
    const modal2Form = document.getElementById("picture-add-form");
    if (modal2Form) {
        console.log("Reset Modal 2Form");
        loadedPicturePlace.innerHTML = "";
        modal2Form.reset();  
    }
};
function clearFileInput() {
    const inputElements = loadedPictureChange.querySelectorAll("input");
    inputElements.forEach(input => {
        input.remove();
    });
};

