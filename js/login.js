if (localStorage.getItem("usuario")) {
    window.location.href = "main.html";
    //console.log("redireccion")
}

document.getElementById("button_login").addEventListener("click", function () {
    let email = document.getElementById ("email").value; 
    let password = document.getElementById ("password").value; 
    
    localStorage.setItem("usuario", email);
    //console.log(localStorage)

    if (email && password) {
        //console.log ("redireccionar")
        window.location.href = "main.html";
    } else {
        showAlertError()
    }
}) 