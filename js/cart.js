let cart = "https://japceibal.github.io/emercado-api/user_cart/25801.json"

document.addEventListener("DOMContentLoaded", function (evt) {
    getJSONData(cart).then(function (resultObj) {
        if (resultObj.status === "ok") { 
            if (localStorage.getItem("carrito")==null) {
            localStorage.setItem("carrito", JSON.stringify(resultObj.data)) 
            } 
        
            showUserCart();
            //console.log(resultObj)
        }
    });
});

function showUserCart () {
    let itemsCart = JSON.parse(localStorage.getItem("carrito")) 
    //console.log(itemsCart)
    let articlesList = "";
    for (let article of itemsCart.articles) {
        //console.log(article);
        articlesList += `
        <tr>
        <th scope="row"><img src="${article.image}" alt="article" width="70" height="50"></th>
        <td>${article.name}</td>
        <td> ${article.currency} ${article.unitCost}</td>
        <td> <input type="numeric" id="count" name="articleCount" value="${article.count}" onchange = "updateCount(${article.id},this.value)"></td>
        <td> ${article.currency} ${article.unitCost * article.count}</td>
        </tr>`;
    }
    document.getElementById("articles").innerHTML = articlesList;
    }

    function updateCount(id, newCount) {
        let inputValue = document.getElementById("count").value;
        //console.log(id, newCount);
        let itemsCart = JSON.parse(localStorage.getItem("carrito"))
        for (const article of itemsCart.articles) {
            if (id == article.id) {
                article.count = newCount
                break 
            }
        }
        localStorage.setItem("carrito", JSON.stringify(itemsCart))
        showUserCart();  
    }