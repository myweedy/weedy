/* =========================
   CART STORAGE
========================= */

let cart =
JSON.parse(localStorage.getItem("cart")) || [];


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

            cartTotal.innerHTML =
            "Total: $0";

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

                <button
                class="remove-btn"
                onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    if(cartTotal){

        cartTotal.innerHTML =
        `Subtotal: $${total}`;

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
        name="contact_value"
        placeholder="Enter WhatsApp Number"
        required>

        `;

    }

    if(method === "signal"){

        box.innerHTML = `

        <input
        type="text"
        id="contactValue"
        name="contact_value"
        placeholder="Enter Signal Username or Number"
        required>

        `;

    }

    if(method === "email"){

        box.innerHTML = `

        <input
        type="email"
        id="contactValue"
        name="contact_value"
        placeholder="Enter Email Address"
        required>

        `;

    }

}


/* =========================
   SUBMIT ORDER
========================= */

async function submitOrder(){

    let form =
    document.querySelector("form");

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

    /* ORDER TEXT */

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

    /* TELEGRAM MESSAGE */

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

    /* SEND TO TELEGRAM */

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

    .then(async data => {

        /* SEND FILE TO NETLIFY */

        let formData =
        new FormData(form);

        await fetch("/",{

            method:"POST",

            body:formData

        });

        /* CLEAR CART */

        localStorage.removeItem("cart");

        /* REDIRECT */

        window.location.href =
        "success.html";

    })

    .catch(error => {

        alert(
            "Error submitting order"
        );

        console.log(error);

    });

}


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

    if(noResults){

        if(found){

            noResults.style.display = "none";

        } else {

            noResults.style.display = "block";

        }

    }

}


/* =========================
   INIT
========================= */

updateCartCount();

displayCart();

/* =========================
   COPY ADDRESS
========================= */

function copyAddress(id){

    let text =
    document
    .getElementById(id)
    .innerText;

    navigator.clipboard
    .writeText(text)

    .then(()=>{

        showPopup(
            "Wallet address copied"
        );

    })

    .catch(()=>{

        alert(
            "Failed to copy address"
        );

    });

}



/* =========================
   DELIVERY CALCULATION
========================= */

function calculateDelivery(){

    let country =
    document
    .getElementById("countrySelect")
    .value;

    let paymentMethod =
    document
    .getElementById("paymentMethod")
    .value;

    let deliveryText =
    document
    .getElementById("deliveryText");

    let finalTotal =
    document
    .getElementById("finalTotal");

    let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    let subtotal = 0;

    cart.forEach(item => {

        subtotal +=
        item.price * item.quantity;

    });

    /* NO COUNTRY */

    if(!country){

        deliveryText.innerHTML = `
        Delivery Fee:
        Select country first
        `;

        finalTotal.innerHTML = `
        Final Total:
        $${subtotal}
        `;

        return;

    }

    /* DELIVERY */

    let deliveryFee = 20;

    if(country === "United States"){

        deliveryFee = 10;

    }

    /* TOTAL */

    let total =
    subtotal + deliveryFee;

    /* UPDATE UI */

    deliveryText.innerHTML = `
    Delivery Fee: $${deliveryFee}
    `;

    finalTotal.innerHTML = `
    Final Total: $${total}
    `;

    /* OPTIONAL PAYMENT INFO */

    if(paymentMethod){

        showPopup(
            `Total payable: $${total}`
        );

    }

}