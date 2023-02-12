let productdetials = JSON.parse(localStorage.getItem('singleproduct'));
let productdetailsdom = document.getElementById('product-details') || 1
let prodquandom = document.getElementById('item-qty');
let productscart = JSON.parse(localStorage.getItem('productsInCart'));
let prodcutIncart =productscart.find((prod) => prod.id === productdetials.id)


// update counter
let updatecounter =() => {
    let counter = document.getElementById('count');
    let count = localStorage.getItem('cartproductscount') && JSON.parse(localStorage.getItem('cartproductscount'));
    counter.innerHTML = count
}
updatecounter()


let quantity = 1
const increaseqauntity = () => {
    quantity +=1
    prodquandom.innerHTML=quantity
}

const decreaseqauntity = () => {
    if(quantity > 1)
    {
        quantity -=1
        prodquandom.innerHTML=quantity
    }  
}


let drowproductdetails = () => {
       
        let productdetails = `<img class="product-img" src=${productdetials.image} id="product-img" width="500px" height="500px"/>
        <div class="product-desc">
            <p class="product-name" id="product-name">${productdetials.name}</p>
            <p class="product-category" id="product-category">${productdetials.categotyname}</p>
            <p class="product-price" id="product-price"> EGP ${productdetials.price}</p>
            <p class="weigth" id="weigth">Grocery Weight</p>
            <select id="select-weigh" class="select-weigh"></select>
            <p>Quantity</p>
            <p class="quan">
                <button class="decrease-qty" onClick="decreaseqauntity()">-</button>
                <span class="item-qty" id="item-qty">${quantity}</span>
                <button class="increase-qty" onClick="increaseqauntity()">+</button>
           </p>
            <button class="cart-btn my-3" id="cart-btn">add to cart<span class="prodquant">${prodcutIncart.qty}</span></button>
            <div><b>Deliver within : </b>the same <b>day</b></div>
            <hr>
            <div>Sold and delivered by spinneys</div>
            <hr>
        </div>`
        productdetailsdom.innerHTML=productdetails
        return productdetails
}

drowproductdetails()






