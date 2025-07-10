// Url API //
const baseUrl = "https://sophie-bluel-portfolio.onrender.com";


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


//Login listener//
document.querySelector(".login-form").addEventListener("submit", function(event) {
  event.preventDefault(); 
  submitForm();
  console.log("Submit POST")
});


 //Login function //
 
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
      const {userId, token } = data; 
      
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
      localStorage.setItem("loginSuccess", "true");
      window.location.href = "index.html"; 
    } else {
      document.getElementById("error-message").innerText = "Erreur dans l’identifiant ou le mot de passe";
    };
  }

  catch (error) {
    console.error("Connexion error", error);
  }
};
  

