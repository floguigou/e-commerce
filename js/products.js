fetch("https://japceibal.github.io/emercado-api/cats_products/101.json")
.then(response => response.json())
.then(data => showProductsList(data.products))




function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let product = array[i];
        console.log(product)
        htmlContentToAppend +=`
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name +`</h4> 
                        <p> `+ product.description +`</p> 
                        <p> `+ product.soldCount +` vendidos </p> 
                        </div>
                        <small class="text-muted">` + product.cost + ` `+ product.currency + `</small> 
                         
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend; 
    }
}
