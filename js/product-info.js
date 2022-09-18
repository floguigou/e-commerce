let productinfo = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("productID")}.json`;
let infocomments = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("productID")}.json`;
let comments = [];

document.addEventListener("DOMContentLoaded", function (evt) {
    getJSONData(productinfo).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showProductsInfoList(resultObj.data);
        }
    });

    getJSONData(infocomments).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;
            showProductsComments(comments);
        }
    });

    getJSONData(`https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`)
    .then(function(resultObj){
        if (resultObj.status === "ok"){
            showProductsList(resultObj.data.products)
        }
    });
});

function obtener_localStorage() {
    let mostrarEmail = localStorage.getItem("usuario");
    return mostrarEmail;
}

function showProductsInfoList(product) {
    let imgProducts = "";
    for (let img of product.images) {
        imgProducts += `<img class="col-2 border m-2" src="${img}"/>`;
    }

    let products = `<h2> ${product.name} </h2>
    <hr> 
    <h4><strong> Precio </strong></h4>
    <p> ${product.currency} ${product.cost} </p>
    <br>
    <h4><strong> Descripción </strong></h4>
    <p> ${product.description} </p>
    <br>
    <h4><strong> Categoría </strong></h4>
    <p> ${product.category} </p>
    <br>
    <h4><strong> Cantidad vendida </strong></h4>
    <p> ${product.soldCount} </p>
    <br>
    <h4><strong> Imágenes ilustrativas </strong></h4>
    <div class="d-flex justify-content-center">
        <div class="row"> 
            ${imgProducts}
        </div>
    </div>
    `;
    document.getElementById("info-product").innerHTML = products;
}


function showProductsComments(listComments) {
    let productComments = "";
    for (let comment of listComments) {
        productComments += `
                    <div class="row">
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1">
                                <h4> ${comment.user} ${comment.dateTime} ${stars(comment.score)}</h4> 
                                <p> ${comment.description} </p> 
                                </div>
                            </div>
                        </div>
                    </div>`;
        //console.log(comment)
    }
    document.getElementById("comments-product").innerHTML = productComments;
}

const stars = (score) => {
    let star = "";
    for (let s = 1; s <= 5; s++) {
        if (s <= score) {
            star += '<span class="fa fa-star checked"></span>';
        } else {
            star += '<span class="fa fa-star"></span>';
        }
    }
    return star;
};

function showProductsList(products){
    let htmlContentToAppend = "";

    for(let i = 0; i < 4; i++){ 
        let product = products[i];

            htmlContentToAppend +=`
                <div class='col' onclick = "setProductID(${product.id})">
                <img class="col-8 border m-2" src="` + product.image + `">
                <h4>`+ product.name +`</h4>
                </div> 
            `
        }
        document.getElementById("container-relacionados").innerHTML = htmlContentToAppend; 
    }

    function setProductID(id) {
        localStorage.setItem("productID", id);
        window.location = "product-info.html"
    }

const formatYmd = (date) => date.toISOString().slice(0, 10) + " " + date.toTimeString().slice(0, 8);

let buttonEnviar = document.getElementById("enviar");

buttonEnviar.addEventListener("click", (evt) => {
    let inputText = document.getElementById("opinion");
    let puntuacion = document.getElementById("puntuacion");

    let newComment = {
        user: obtener_localStorage(),
        description: inputText.value,
        score: puntuacion.value,
        dateTime: formatYmd(new Date),
        product: localStorage.getItem("productID"),
    }

    comments.push(newComment);

    showProductsComments(comments);

    inputText.value = "";
    puntuacion.value = 1;
});
