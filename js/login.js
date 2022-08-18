document.getElementById("button_login").addEventListener("click", function () {
    let email = document.getElementById ("email").value; 
    let password = document.getElementById ("password").value; 

    if (email && password) {
        //console.log ("redireccionar")
        window.location.href = "index.html"
    } else {
        showAlertError()
    }
}) 