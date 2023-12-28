// Url API //
const baseUrl = "http://localhost:5678";


//Navbar//
document.getElementById("login-nav-login").addEventListener("click", function (){
  window.location.href = "login.html";
});
document.getElementById("nav-return-projets").addEventListener("click", function (){
  window.location.href = "index.html#projets";
});
document.getElementById("nav-return-contact").addEventListener("click", function (){
  window.location.href = "index.html#contact";
});


//Listener Login//
document.querySelector(".login-form").addEventListener("submit", function(event) {
  event.preventDefault(); 
  submitForm();
  console.log("Submit POST")
});

async function submitForm(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const chargeUtile = JSON.stringify ({
    email,
    password,
  });

  try {
    const response = await fetch(baseUrl +"/api/users/login",{
      method : "POST",
      headers : { "Content-Type": "application/json"},
      body : chargeUtile,
    });
    const data = await response.json();
    
    if (response.ok) {
      console.log("Login API Response OK");
      window.location.href = "home-page-edit.html";
    } else {
      document.getElementById("error-message").innerText = "Erreur dans l’identifiant ou le mot de passe";
    }
  }
  catch (error) {
    console.error("Connexion error", error);
  }
};





/*
//Submit form //
const formLogin = document.querySelector(".login-form");

export function listenerSeconnecter() {
  formLogin.addEventListener("submit", Submit);
}

function Submit(event) {

  console.log("fonction stared submit")
  event.preventDefault();

  const submitInformations = {
    email: getEmailValue(),
    password: getPasswordValue(),
  };

  const chargeUtile = JSON.stringify(submitInformations);

  fetchLoginData(chargeUtile);
}

function getEmailValue() {
  return document.getElementById("email").value;
}
function getPasswordValue() {
  return document.getElementById("password").value;
}
console.log(" Test Recupération infos OK")

function fetchLoginData(chargeUtile) {
  
  console.log("Post vers l'API en cours")
  fetch(baseUrl + "/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: chargeUtile,
  })

  
    .then(response => response.json())
    .then(LoginResponse)
    .catch(FetchError);
}

function LoginResponse(data) {
  console.log(data);

  if (data.success) {
    console.log("Connexion réussie !");
    localStorage.setItem ("isConnected", "true");
    window.location.href = 'index.html'
  } else {
    alert("Échec de la connexion");
    console.error("Échec de la connexion :", data.message);
  }
}

function FetchError(error) {
  console.error("Erreur lors de la requête:", error);
}
;
*/