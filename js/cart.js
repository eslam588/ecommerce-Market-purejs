let cartproducts = document.getElementById('cart-products')
let counter = document.getElementById('count')
let totalpriceprods = document.querySelectorAll('.total')


let updatetotalprice = () => {
    let totprice = localStorage.getItem("totalprice") ? JSON.parse(localStorage.getItem("totalprice")).toFixed(2) : 0
    Array.from(totalpriceprods).map(tot => {
        tot.innerHTML=`${totprice} EGP`
    })
}

updatetotalprice()





let updatecounter =() => {
    let count = JSON.parse(localStorage.getItem('cartproductscount')) || 0;
    counter.innerHTML = count
}
updatecounter()

function drawCartProductsUI (allProducts = []) {
    let productscart = JSON.parse(localStorage.getItem("productsInCart"));
    console.log(productscart.length);
    if(productscart.length == 0 ){
        cartproducts.innerText = "There is no products in cart"
    }
    let products = productscart || allProducts;
    let ProductsUI= products.map((item) => {
        return `
               <div class="product-cart">
                    <img src=${item.image} class="product-item-image" alt="image" width="120px" height="120px" >
                    <div class="product-item-desc">
                        <h2>${item.name}</h2>
                        <p>${item.price} EGP</p>
                        <div class="product-actions">
                           <p>
                            <button class="decrease-qty" onClick="decreaseqty(${item.id})">-</button>
                            <span class="item-qty">${item.qty}</span>
                            <button class="increase-qty" onClick="increaseqty(${item.id})">+</button>
                           </p>
                           <div class="add-fav">
                              <span class="add-to-cart" onClick="removeItemFromCart(${item.id})">Remove</span>   
                              <span>Move to wishlist</span> 
                           </div>
                           
                        </div>
                    </div>
                    
                </div>`
    });
    cartproducts.innerHTML = ProductsUI.join("");
}

drawCartProductsUI();



let totalprice =  localStorage.getItem('totalprice')
? JSON.parse(localStorage.getItem('totalprice'))
: 0 ;

// remove product from cart

function removeItemFromCart(id){
    let productscart = JSON.parse(localStorage.getItem('productsInCart'));
    let count = JSON.parse(localStorage.getItem('cartproductscount'));
    if(productscart){
        let product = productscart.find(product => product.id===id);
        let updatedcount = count-product.qty;
        localStorage.setItem("cartproductscount",JSON.stringify(updatedcount));
        updatecounter()
        let totalprice =  JSON.parse(localStorage.getItem('totalprice'))
        let updatedtotalprice= totalprice-(product.price*product.qty)
        localStorage.setItem('totalprice' , JSON.stringify(updatedtotalprice));
        updatetotalprice()
        let filteredItems = productscart.filter((item) => item.id !== id);
        localStorage.setItem("productsInCart",JSON.stringify(filteredItems));
        drawCartProductsUI(filteredItems) 
    }
}

function increaseqty (id) {
    let productscart = JSON.parse(localStorage.getItem('productsInCart'));
    let count = JSON.parse(localStorage.getItem('cartproductscount'));
    if(productscart){
        let product = productscart.find(product => product.id === id);
        product.qty +=1
        let updatedcount = count+1
        localStorage.setItem("cartproductscount",JSON.stringify(updatedcount));
        updatecounter()
        let totalprice =  JSON.parse(localStorage.getItem('totalprice'))
        let updatedtotalprice= totalprice+product.price
        localStorage.setItem('totalprice' , JSON.stringify(updatedtotalprice));
        updatetotalprice()
        localStorage.setItem("productsInCart",JSON.stringify(productscart));
        
        drawCartProductsUI(productscart) 
    }
}

function decreaseqty (id) {
    let productscart = JSON.parse(localStorage.getItem('productsInCart'));
    let count = JSON.parse(localStorage.getItem('cartproductscount'));
    if(productscart){
        let product = productscart.find(product => product.id === id);
        if(product.qty>1){
            product.qty -=1
            let updatedcount = count-1
            localStorage.setItem("cartproductscount",JSON.stringify(updatedcount));
            updatecounter()
            let totalprice =  JSON.parse(localStorage.getItem('totalprice'))
            let updatedtotalprice= totalprice-product.price
            localStorage.setItem('totalprice' , JSON.stringify(updatedtotalprice));
            updatetotalprice()
        }
        localStorage.setItem("productsInCart",JSON.stringify(productscart));
       
        drawCartProductsUI(productscart) 
    }
}








 
