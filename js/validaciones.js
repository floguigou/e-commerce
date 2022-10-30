let validacion1 = document.getElementsByClassName("validacion1");

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

function validacion () {
    let valido = true
    let alerta = document.getElementById("alert");

    for (const element of validacion1) {
        if ((!element.checkValidity()) && (!element.disabled)) {
            element.classList.add("is-invalid");
            element.classList.remove("is-valid");
            valido = false
        } else {
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
        } 
    }

    let metodoPago = document.getElementsByName('pago');
        for (const element of metodoPago) {
            if(element.checked) {
                metodoPago = element.value;
                break
            }
        } 
        //console.log(metodoPago);
        let mPago = document.getElementsByClassName('mpago');
        let mPagoValid = true
        for (const element of mPago) {
            if ((!element.disabled) && (element.value == "")) {
                mPagoValid = false
                break
            }
            
        }
    if ((metodoPago == "tarjeta" || metodoPago == "banco") && (mPagoValid)) {
        document.getElementById('formPago').innerHTML = ""
    } else {
        document.getElementById('formPago').innerHTML = "Debe seleccionar una forma de pago."
        valido = false
    } 
 
    if (valido) {
        alerta.classList.remove('d-none')
        //console.log("ok");
    } else {
            alerta.classList.add("d-none");
        //console.log("no ok");
    }
}

document.getElementById("finalizarCompra").addEventListener("click", function(evt){
    evt.preventDefault();
    validacion();
})
