let cart = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const cotizacionDolar = 40

document.addEventListener("DOMContentLoaded", function (evt) {
    getJSONData(cart).then(function (resultObj) {
        if (resultObj.status === "ok") {
            if (localStorage.getItem("carrito") == null) {
                localStorage.setItem("carrito", JSON.stringify(resultObj.data))
            }

            showUserCart();
            //console.log(resultObj)
        }
    });
});

function showUserCart() {
    let itemsCart = JSON.parse(localStorage.getItem("carrito"))
    //console.log(itemsCart)
    let articlesList = "";
    let subtotal = 0
    let metodoEnvio;

    let elements = document.getElementsByName('tipoEnvio');
    for (const element of elements) {
        if (element.checked) {
            metodoEnvio = element.value;
            break
        }
    }

    let envioPorcentaje = 0
    //console.log(metodoEnvio);
    switch (metodoEnvio) {
        case 'premium':
            envioPorcentaje = 0.15;
            break;

        case 'express':
            envioPorcentaje = 0.07;
            break;

        case 'standard':
            envioPorcentaje = 0.05;
            break;
    }

    let costoEnvio = 0
    for (let article of itemsCart.articles) {
        //console.log(article.currency.trim().toLowerCase());
        if (article.currency.toUpperCase().trim() == 'USD') {
            subtotal = subtotal + (article.unitCost * article.count);
            costoEnvio = costoEnvio + (article.unitCost * article.count) * envioPorcentaje
        } else {
            subtotal = subtotal + (article.unitCost * article.count) / cotizacionDolar;
            costoEnvio = costoEnvio + (article.unitCost * article.count) * (envioPorcentaje) / cotizacionDolar;
        }

        articlesList += `
        <tr>
        <th scope="row"><img src="${article.image}" alt="article" width="70" height="50"></th>
        <td>${article.name}</td>
        <td> ${article.currency} ${article.unitCost}</td>
        <td> <input type="numeric" id="count" name="articleCount" value="${article.count}" onchange = "updateCount(${article.id},this.value)"></td>
        <td> ${article.currency} ${article.unitCost * article.count}</td>
        <td> <button class="fa fa-trash border-0" aria-hidden="true" id="removeItemCart" onclick="removeCart(${article.id})"></button>
        </tr>`;
    }
    document.getElementById("articles").innerHTML = articlesList;
    document.getElementById("subtotal").innerHTML = "USD " + subtotal;
    document.getElementById('costoEnvio').innerHTML = "USD " + costoEnvio;
    document.getElementById('total').innerHTML = "USD " + (subtotal + costoEnvio);
}

function updateCount(id, newCount) {
    let inputValue = document.getElementById("count").value;
    //console.log(id, newCount);
    let itemsCart = JSON.parse(localStorage.getItem("carrito"))
    for (const article of itemsCart.articles) {
        if (id == article.id) {
            if (newCount < 1) {
                article.count = 1
            } else {
                article.count = newCount
            }
            break
        }
    }
    localStorage.setItem("carrito", JSON.stringify(itemsCart))
    showUserCart();
}

function seleccionMetodoPago() {
    let metodoPago = document.getElementsByName('pago');
    for (const element of metodoPago) {
        if (element.checked) {
            metodoPago = element.value;
            break
        }
    }
    //console.log(metodoPago);

    if (metodoPago == "tarjeta") {
        document.getElementById('metodoPago').innerHTML = "Tarjeta de credito"

    } else {
        document.getElementById('metodoPago').innerHTML = "Transferencia bancaria"
    }
    document.getElementById('btnCerrar').click();

}

function mtPago() {
    let metodoPago = document.getElementsByName('pago');
    for (const element of metodoPago) {
        if (element.checked) {
            metodoPago = element.value;
            break
        }
    }

    if (metodoPago == "tarjeta") {
        document.getElementById('numeroCuenta').disabled = true
        document.getElementById('numeroTarjeta').disabled = false
        document.getElementById('codigoSeguridad').disabled = false
        document.getElementById('vencimiento').disabled = false
    } else {
        document.getElementById('numeroTarjeta').disabled = true
        document.getElementById('codigoSeguridad').disabled = true
        document.getElementById('vencimiento').disabled = true
        document.getElementById('numeroCuenta').disabled = false
    }
}

function removeCart(id) {

    let itemsCart = JSON.parse(localStorage.getItem("carrito"))
    //console.log(itemsCart); 

    for (let i = 0; i < itemsCart.articles.length; i++) {
        let itemCart = itemsCart.articles[i];
        //console.log(itemCart);

        if (id == itemCart.id) {
            itemsCart.articles.splice(i, 1);
            break
        }
    }

    localStorage.setItem("carrito", JSON.stringify(itemsCart))
    showUserCart();
}
