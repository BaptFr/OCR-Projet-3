
// Call API //
const apiUrl = 'http://localhost:5678/api/works';
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur réseau ou problème de serveur');
        }
        return response.json();
    })
    .then(data => {
        console.log('Données de l\'API :', data);
        updateGallery(data);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données de l\'API :', error);
    });


// Function API Projets gallery  //
function updateGallery(apiProjets) {
const galleryElement = document.querySelector('.gallery');

if (!galleryElement) {
    console.error("API Projets datas unfound.");
    return;
}

else{

galleryElement.innerHTML = '';

apiProjets.forEach(item => {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    const imageElement = document.createElement('img');
    imageElement.src = item.imageUrl; 
    imageElement.alt = item.title; 

    const titleElement = document.createElement('p');
    titleElement.classList.add('title');
    titleElement.textContent = item.title;

    imageContainer.appendChild(imageElement);
    imageContainer.appendChild(titleElement);
    galleryElement.appendChild(imageContainer);

    console.log("API loading Projets gallery OK.");

});}
}

