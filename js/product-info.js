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

    for(let i=1; i<product.images.length; i++) {
        let img = product.images[i]
        if (i==1) {
            imgProducts += `<div class="carousel-item active">
            <img class="d-block w-100" src="${img}" />
          </div>`;
        } else {
            imgProducts += `<div class="carousel-item">
            <img class="d-block w-100" src="${img}" />
          </div>`;
        }
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
    <div id="carouselExampleControls" class="carousel slide col-8" data-ride="carousel">
    <div class="carousel-inner">
        ${imgProducts}
    </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
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
