let products=[
    {
        id:1,
        name:"Roomi cheese",
        image:"/images/cheese.jpg",
        price:67.94,
        weigth:[250,500,750,1000],
        categotyname:"Food"
    },
    {
        id:2,
        name:"Abu Auf Amr Eldin",
        image:"/images/amar-eldein.jpg",
        price:34.95,
        categotyname:"Food"
    },
    {
        id:3,
        name:"fava beans box",
        image:"/images/Fava-Beans.jpg",
        price:25.85,
        weigth:[500,820,1000],
        categotyname:"Food"
    },
    {
        id:4,
        name:"Spaghetti Queen",
        image:"/images/Spaghetti-Queen.jpg",
        price:8.75,
        categotyname:"Food"
    },
    {
        id:5,
        name:"Dishwashing Liquid prill",
        image:"/images/pril.jpg",
        price:36,
        categotyname:"NonFood"
    },
    {
        id:6,
        name:"Arial Automatic",
        image:"/images/arial-automatic.jpg",
        price:120,
        categotyname:"NonFood"
    },
    {
        id:7,
        name:"Feba Dish Cleaner",
        image:"/images/fiba.jpg",
        price:84.85,
        categotyname:"NonFood"
    },
    {
        id:8,
        name:"banans",
        image:"/images/banans.webp",
        price:20,
        categotyname:"Fruits"
    },
    {
        id:9,
        name:"strawberries berries",
        image:"/images/strawberries-berries.jpeg",
        price:15.50,
        categotyname:"Fruits"
    },
    {
        id:10,
        name:"oranges",
        image:"/images/oranges.webp",
        price:8.45,
        categotyname:"Fruits"
    }
]
localStorage.setItem("products", JSON.stringify(products))

let allcategories = ["All","Food","NonFood","Fruits"]

// fetch all elementsdom by Id

const categories = document.getElementById('categories');
const productscount = document.getElementById('products-count');
const selectoptions = document.getElementById('select-options');
const productsbox = document.getElementById('products');
const viewgrid = document.getElementById('view-grid');
const viewlist = document.getElementById('view-list');
const counter = document.getElementById('count');


// create categories elements --------------------------------------------------------

allcategories.forEach((category)=> {
    let cat= document.createElement("p");
    cat.classList.add("cat-name");
    cat.innerText= category
    categories.appendChild(cat);
    cat.addEventListener("click", () => filterbycategory(category));
})


// filter products by categories  -----------------------------------------------------

let filterbycategory= (cat) => {
    let buttons = document.querySelectorAll(".cat-name");
    buttons.forEach((button) => {
        if (cat == button.innerText){
            button.classList.add("active");
        }
        else{
            button.classList.remove("active");
        }
    })

    let cards = document.querySelectorAll(".product-card");
    cards.forEach((card) => {
        if(cat == 'All'){
            card.classList.remove("hide-card");
        }
        else{
            if (card.classList.contains(cat)) {
                card.classList.remove("hide-card");
            }
            else {
                card.classList.add("hide-card");
            }
        }
        
    })

}




window.onload = () =>{
    filterbycategory('All');
    counter.innerText = Number(JSON.parse(localStorage.getItem("cartproductscount")));
} 

// create select options for sortedby products -----------------------------------------------

let options = ["Newest First","Oldest","Highest","lowest"]
let selectelement = document.createElement("select");
selectelement.classList.add("select-elments")
options.forEach(option => {
    let optionelement = document.createElement("option");
    optionelement.value=option
    optionelement.innerText=option
    optionelement.classList.add("element-option");
    selectelement.appendChild(optionelement);
    
})
selectoptions.appendChild(selectelement)



// sorted products --------------------------------------------------------------------- 


// let sortHighestfun = (products) => {
//    let producthieghest = products.sort((a,b)=> {
//     return b.price - a.price;
//    })
// }

// let sortLowestfun = () => {  
// }

// selectelement.addEventListener("click", function(e){
//     let optionvalue = e.target.value

//     if(optionvalue == "Newest First"){

//     }
//     else if(optionvalue == "Oldest"){

//     }
//     else if(optionvalue == "Highest"){
//         sortHighestfun(products)
//     }
//     else if(optionvalue == "lowest"){
        
//     }


// })


//add to cart -------------------------------------------------------------------------------------------------------

let addedCartItems = localStorage.getItem('productsInCart')
? JSON.parse(localStorage.getItem('productsInCart'))
: [] ;

let totalprice =  localStorage.getItem('totalprice')
? JSON.parse(localStorage.getItem('totalprice'))
: 0 ;

let updatecounter = () => {
    let count = localStorage.getItem('cartproductscount') && JSON.parse(localStorage.getItem('cartproductscount'));
    counter.innerHTML = count
}
updatecounter()






// create  products card --------------------------------------------------------------------
function drawProdctsCard () {
    products.forEach(product => {
        let card = document.createElement("div");
        card.classList.add("product-card", product.categotyname ,"hide-card");
        var favouritebtn = document.createElement("p");
        favouritebtn.setAttribute("class","favourite-icon");
        favouritebtn.innerHTML='<i class="fa-regular fa-heart"></i>'
        card.appendChild(favouritebtn)
        let imgContainer = document.createElement("div");
        imgContainer.addEventListener("click", () => gotosinglepage(product))
        imgContainer.classList.add("img-container");
        let image = document.createElement("img");
        image.setAttribute("src", product.image);
        image.setAttribute("width","180px");
        image.setAttribute("height","150px");
        image.classList.add("img-class")
        imgContainer.appendChild(image);
        card.appendChild(imgContainer);
        let container =document.createElement("div");
        container.classList.add("desc-container");
        let name = document.createElement("h5");
        name.classList.add("item-name");
        name.innerText= product.name;
        container.appendChild(name);
        let price = document.createElement("p");
        price.classList.add("item-price");
        price.innerText= `EGP ${product.price}`;
        container.appendChild(price);
        let addcart = document.createElement("button");
        addcart.classList.add(`item-add`);
        addcart.innerText="add to cart"; 
        addcart.addEventListener("click", () => addedToCart(product.id))
        container.appendChild(addcart);
    
        // add count on card 
        let CartItems = JSON.parse(localStorage.getItem('productsInCart')) || [];
        CartItems.map(addcartItem => {
            if(addcartItem.id == product.id){
                let cartquantity = document.createElement("span");
                cartquantity.classList.add("item-quant");
                cartquantity.innerText=addcartItem.qty; 
                addcart.appendChild(cartquantity)
            }
        })
        card.appendChild(container);
        productsbox.appendChild(card)
    })
}

drawProdctsCard();

function addedToCart(id){
    let allproducts = products
    let product = allproducts.find((item) => item.id === id);
    let isProductInCart = addedCartItems.some(i => i.id === product.id);
    if(isProductInCart)
    {
        addedCartItems = addedCartItems.map((p) => {
            if(p.id === product.id) p.qty+=1
            return p;   
        })           
    }
    else{
        product = {...product , qty :1}
        addedCartItems.push(product);
    }
    //update total price
    let totalprice =  JSON.parse(localStorage.getItem('totalprice'))
    let updatedtotalprice= totalprice+product.price
    localStorage.setItem('totalprice' , JSON.stringify(updatedtotalprice));
    // update cart counter;
    let counter = localStorage.getItem("cartproductscount") ? JSON.parse(localStorage.getItem("cartproductscount")) :  0
    let updatedcount = counter + 1
    localStorage.setItem("cartproductscount",JSON.stringify(updatedcount));
    updatecounter()
    // save cartItems 
    localStorage.setItem('productsInCart' , JSON.stringify(addedCartItems));
}





// got to singleproduct --------------------------------------------------------------------------------

let gotosinglepage = (product) => {
    addedToCart(product.id)
    localStorage.setItem("singleproduct", JSON.stringify(product));
    location.href="/singleproduct.html" 
}


// toggle between grid and list  ----------------------------------------------------------------------

let viewgridfun = () =>  {
    productsbox.classList.add("products-grid");
    productsbox.classList.remove("products-list");  
    viewgrid.classList.add("view-active-btn")
    viewlist.classList.remove("view-active-btn");
    let elemtscards = document.getElementsByClassName("product-card");
    console.log(elemtscards);
    Array.from(elemtscards).forEach(ele => {
        ele.classList.add("product-card-grid")
        ele.classList.remove("product-card-list")
    })
}
viewgrid.addEventListener("click",viewgridfun);

setTimeout(()=> viewgrid.click())

let viewlistfun = () =>  {
    productsbox.classList.add("products-list");
    productsbox.classList.remove("products-grid");
    viewlist.classList.add("view-active-btn")
    viewgrid.classList.remove("view-active-btn");
    let elemtscards = document.getElementsByClassName("product-card");
    Array.from(elemtscards).forEach(ele => {
        ele.classList.add("product-card-list")
        ele.classList.remove("product-card-grid")
    })
 }
 viewlist.addEventListener("click",viewlistfun);














