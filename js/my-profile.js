let validacion2 = document.getElementsByClassName("validacion2");

function infoProfile() { 
    const user = {
        primerNombre: document.getElementById("fname").value,
        segundoNombre: document.getElementById("sname").value,
        primerApellido: document.getElementById("lname").value,
        segundoApellido: document.getElementById("lanme1").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value
    }

    localStorage.setItem("infoUsuario", JSON.stringify(user))
}

document.addEventListener("DOMContentLoaded", function () {
    let usuario = JSON.parse(localStorage.getItem("infoUsuario"));
    //console.log(usuario);

    if (usuario.primerNombre !== "") {
        document.getElementById("fname").value = usuario.primerNombre
    }

    if (usuario.segundoNombre !== "") {
        document.getElementById("sname").value = usuario.segundoNombre
    }

    if (usuario.primerApellido !== "") {
        document.getElementById("lname").value = usuario.primerApellido
    }

    if (usuario.segundoApellido !== "") {
        document.getElementById("lanme1").value = usuario.segundoApellido
    }

    if (usuario.telefono !== "") {
        document.getElementById("telefono").value = usuario.telefono
    }

    obtenerImagen();
})

function validacion() {
    let valido = true

    for (const element of validacion2) {
        if ((!element.checkValidity())) {
            element.classList.add("is-invalid");
            element.classList.remove("is-valid");
            valido = false
        } else {
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
        }
    }
}

document.getElementById("email").value = localStorage.getItem("usuario");

avatar.addEventListener("change", () => {
    const foto = new FileReader();
    foto.readAsDataURL(avatar.files[0]);
    foto.addEventListener("load", () => {
        const url = foto.result;
        //console.log(url);
        localStorage.setItem("imagen", url);
    });
})

function obtenerImagen() {
if(!localStorage.getItem("imagen")) {
    document.getElementById("image").setAttribute("src", "img/img_perfil.png");
    return
}

    const url = localStorage.getItem("imagen");
    const img = new Image();
    img.src = url;

    document.getElementById("image").setAttribute("src", url);
}

document.getElementById("guardarCambios").addEventListener("click", function (evt) {
    evt.preventDefault();
    validacion();
    infoProfile();
    obtenerImagen();
})




