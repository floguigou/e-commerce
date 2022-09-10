let productinfo = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("productID")}.json`
let infocomments = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("productID")}.json`


document.addEventListener("DOMContentLoaded", function(evt){

    getJSONData(productinfo)
    .then(function(resultObj){
        if (resultObj.status === "ok"){
            showProductsInfoList(resultObj.data)
        }
    });
});

function showProductsInfoList (product) {
    let imgProducts = ""
for(let img of product.images) {
    imgProducts +=`
    <img src="${img}"/>`
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
   <div>
   <p> ${imgProducts} </p>
   </div>
   `
   document.getElementById("info-product").innerHTML = products;
}


document.addEventListener("DOMContentLoaded", function(evt){

    getJSONData(infocomments)
    .then(function(resultObj){
        if (resultObj.status === "ok"){
            showProductsComments(resultObj.data)
        }
    });
});

function showProductsComments(infocomments){
    let comments = "";

    for(let comment of infocomments ){ 
            comments +=`
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4> ${comment.user} ${comment.dateTime} ${comment.score} </h4> 
                            <p> ${comment.description} </p> 
                            </div>
                        </div>
                    </div>
                </div>`
        }
        document.getElementById("comments-product").innerHTML = comments;
    }