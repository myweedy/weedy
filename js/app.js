/* =========================
   CART STORAGE
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* =========================
   ADD TO CART
========================= */

function addToCart(name, price, image){

    let existing =
    cart.find(item => item.name === name);

    if(existing){

        existing.quantity += 1;

    } else {

        cart.push({
            name,
            price,
            image,
            quantity:1
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    displayCart();

    showPopup(name + " added to cart");

}


/* =========================
   UPDATE CART COUNT
========================= */

function updateCartCount(){

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    document
    .querySelectorAll(".cart-count")
    .forEach(counter => {

        counter.innerText = total;

    });

}


/* =========================
   DISPLAY CART
========================= */

function displayCart(){

    let cartItems =
    document.getElementById("cart-items");

    let cartTotal =
    document.getElementById("cart-total");

    if(!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartItems.innerHTML = `

        <h2 class="empty-cart">
            Your cart is empty
        </h2>

        `;

        if(cartTotal){

            cartTotal.innerHTML = "";

        }

        return;
    }

    cart.forEach((item,index)=>{

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item fade-in">

            <img src="${item.image}">

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>$${item.price}</p>

                <p>
                    Subtotal:
                    $${item.price * item.quantity}
                </p>

                <div class="qty-box">

                    <button onclick="decreaseQty(${index})">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQty(${index})">
                        +
                    </button>

                </div>

                <button class="remove-btn"
                onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        </div>

        `;
    });

    if(cartTotal){

        cartTotal.innerHTML = `
            Total: $${total}
        `;

    }

}


/* =========================
   REMOVE ITEM
========================= */

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    displayCart();

}


/* =========================
   INCREASE QUANTITY
========================= */

function increaseQty(index){

    cart[index].quantity++;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    displayCart();

}


/* =========================
   DECREASE QUANTITY
========================= */

function decreaseQty(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    } else {

        cart.splice(index,1);

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    displayCart();

}


/* =========================
   POPUP
========================= */

function showPopup(message){

    let popup =
    document.createElement("div");

    popup.className = "popup";

    popup.innerText = message;

    document.body.appendChild(popup);

    setTimeout(()=>{

        popup.classList.add("show");

    },100);

    setTimeout(()=>{

        popup.classList.remove("show");

        setTimeout(()=>{

            popup.remove();

        },300);

    },2000);

}


/* =========================
   PRODUCT PREVIEW
========================= */

function openPreview(
    image,
    title,
    price,
    description
){

    document
    .getElementById("previewModal")
    .style.display = "flex";

    document
    .getElementById("previewImage")
    .src = image;

    document
    .getElementById("previewTitle")
    .innerText = title;

    document
    .getElementById("previewPrice")
    .innerText = price;

    document
    .getElementById("previewDescription")
    .innerText = description;

    /* PREVIEW BUTTON */

    let btn =
    document.getElementById("previewCartBtn");

    btn.onclick = function(){

        addToCart(

            title,

            parseInt(
                price.replace("$","")
            ),

            image

        );

    };

}


/* =========================
   CLOSE PREVIEW
========================= */

function closePreview(){

    document
    .getElementById("previewModal")
    .style.display = "none";

}


/* =========================
   PAYMENT METHOD
========================= */

function showPaymentDetails(){

    let method =
    document
    .getElementById("paymentMethod")
    .value;

    /* HIDE ALL */

    document
    .getElementById("btcBox")
    .style.display = "none";

    document
    .getElementById("usdtBox")
    .style.display = "none";

    document
    .getElementById("ethBox")
    .style.display = "none";

    document
    .getElementById("giftcardBox")
    .style.display = "none";

    /* SHOW SELECTED */

    if(method === "btc"){

        document
        .getElementById("btcBox")
        .style.display = "block";

    }

    if(method === "usdt"){

        document
        .getElementById("usdtBox")
        .style.display = "block";

    }

    if(method === "eth"){

        document
        .getElementById("ethBox")
        .style.display = "block";

    }

    if(method === "giftcard"){

        document
        .getElementById("giftcardBox")
        .style.display = "block";

    }

}


/* =========================
   CONTACT FIELD
========================= */

function showContactField(){

    let method =
    document
    .getElementById("contactMethod")
    .value;

    let box =
    document
    .getElementById("contactFieldBox");

    if(method === "whatsapp"){

        box.innerHTML = `

        <input
        type="text"
        id="contactValue"
        placeholder="Enter WhatsApp Number"
        required>

        `;

    }

    if(method === "signal"){

        box.innerHTML = `

        <input
        type="text"
        id="contactValue"
        placeholder="Enter Signal Username or Number"
        required>

        `;

    }

    if(method === "email"){

        box.innerHTML = `

        <input
        type="email"
        id="contactValue"
        placeholder="Enter Email Address"
        required>

        `;

    }

}


/* =========================
   TELEGRAM ORDER
========================= */

async function submitOrder(){

    let name =
    document
    .getElementById("customerName")
    .value;

    let contactMethod =
    document
    .getElementById("contactMethod")
    .value;

    let contactValue =
    document
    .getElementById("contactValue")
    .value;

    let paymentMethod =
    document
    .getElementById("paymentMethod")
    .value;

    let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    if(
        !name ||
        !contactMethod ||
        !contactValue ||
        !paymentMethod
    ){

        alert(
            "Please complete all required fields"
        );

        return;
    }

    let orderText = "";

    cart.forEach(item => {

        orderText += `

${item.name}

Quantity:
${item.quantity}

Price:
$${item.price}

-------------------

`;

    });

    let message = `

🛒 NEW ORDER

👤 Name:
${name}

📞 Contact Method:
${contactMethod}

📱 Contact:
${contactValue}

💳 Payment:
${paymentMethod}

📦 ORDER ITEMS:

${orderText}

`;

    fetch("/.netlify/functions/telegram",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            message:message
        })

    })

    .then(res => res.json())

    .then(data => {

        alert(
            "Order submitted successfully"
        );

        localStorage.removeItem("cart");

        window.location.href =
        "index.html";

    })

    .catch(error => {

        alert(
            "Error sending order"
        );

        console.log(error);

    });

}


/* =========================
   INIT
========================= */

updateCartCount();

displayCart();

/* =========================
   SEARCH PRODUCTS
========================= */

function searchProducts(){

    let input =
    document.getElementById("searchInput");

    if(!input) return;

    let filter =
    input.value.toLowerCase();

    let products =
    document.querySelectorAll(".product");

    let noResults =
    document.getElementById("noResults");

    let found = false;

    products.forEach(product => {

        let title =
        product.querySelector("h3")
        .innerText
        .toLowerCase();

        if(title.includes(filter)){

            product.style.display = "block";

            found = true;

        } else {

            product.style.display = "none";

        }

    });

    /* SHOW MESSAGE */

    if(found){

        noResults.style.display = "none";

    } else {

        noResults.style.display = "block";

    }

}/* =========================
   SEARCH PRODUCTS
========================= */

function searchProducts(){

    let input =
    document.getElementById("searchInput");

    if(!input) return;

    let filter =
    input.value.toLowerCase();

    let products =
    document.querySelectorAll(".product");

    let noResults =
    document.getElementById("noResults");

    let found = false;

    products.forEach(product => {

        let title =
        product.querySelector("h3")
        .innerText
        .toLowerCase();

        if(title.includes(filter)){

            product.style.display = "block";

            found = true;

        } else {

            product.style.display = "none";

        }

    });

    /* SHOW MESSAGE */

    if(found){

        noResults.style.display = "none";

    } else {

        noResults.style.display = "block";

    }

}