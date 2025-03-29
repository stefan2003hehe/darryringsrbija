window.onload = function () {
    updateCartCount();


    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");
    const buttonContainer = document.getElementById("cart-buttons");
    const continueShoppingBtn = document.getElementById("continue-shopping");
    
    cartContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        // Ako je korpa prazna, prikaži poruku i dugme
        cartContainer.innerHTML = `<p class="prazna">Korpa vam je prazna.</p>`;
        continueShoppingBtn.style.display = "block";
        buttonContainer.style.display = "none";

    } else {
        continueShoppingBtn.style.display = "none";
   
    cart.forEach((item, index) => {
        let itemTotal = parseFloat(item.price) * parseInt(item.quantity);
        total += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.productName}">
                <div class="cart-info">
                    <h3>${item.productName}</h3>
                    <p class="item-price" >${parseFloat(item.price).toFixed(2)} RSD</p>
                    <div class="quantity-selector">
                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        <input  type="number" value="${item.quantity}" min="1" readonly>
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <span>Prečnik Prstena: ${item.diameter}</span>
                    <div class="remove-from-cart-container"><button class="remove-from-cart-button" onclick="removeFromCart(${index})"></button></div>

                    <p class="item-total" >Ukupno: ${itemTotal.toFixed(2)} RSD</p>
                    
                </div>
            </div>
        `;
    });
    totalContainer.innerText = total.toFixed(2) + " RSD";
     
}


};






// Ažuriranje količine proizvoda
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart[index].quantity + change > 0) {
        cart[index].quantity = parseInt(cart[index].quantity) + change;
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
    }
}

// Brisanje proizvoda iz korpe
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

// Brisanje cele korpe
function clearCart() {
    localStorage.removeItem("cart");
    location.reload();
}





// /////////////////////////////// CHECKOUT DEO ///////////////////////////////////////////

document.getElementById("openModal").onclick = function () {
    document.getElementById("checkoutModal").style.display = "grid";
};

document.querySelector(".close").onclick = function () {
    document.getElementById("checkoutModal").style.display = "none";
};



document.addEventListener("DOMContentLoaded", function () {

 updateCartCount();


    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("checkoutItems");
    const totalContainer = document.getElementById("totalPrice");

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = parseFloat(item.price) * parseInt(item.quantity);
        total += itemTotal;

        cartContainer.innerHTML += `
            <div class="checkout-item">
                <img src="${item.image}" alt="${item.productName}">
                <div class="checkout-info" data-name="${item.productName}" data-size="${item.diameter}" data-price="${item.price}" data-quantity="${item.quantity}">
                    <h3>${item.productName}</h3>
                    <p>Kvantitet:${item.quantity}</p>
                    <span>Prečnik Prstena: ${item.diameter}</span>
                    <p class="checkout-item-price" >${parseFloat(item.price).toFixed(2)} RSD</p>
                </div>
            </div>
        `;
    });

    totalContainer.innerText = total.toFixed(2) + " RSD";

});



// /////////////////////////////// SLANJE NA EMAIL DEO ///////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("Q2v33nzqBM2C8eHF6");

    document.getElementById("orderForm").addEventListener("submit", function(event) {
        event.preventDefault();  // Sprečava refresh
        console.log("Submit event prevented!"); // Provera u konzoli

        let formData = {
            name: document.getElementById("ime").value,
            surname: document.getElementById("prezime").value,
            phone: document.getElementById("telefon").value,
            city: document.getElementById("grad").value,
            address: document.getElementById("ulica").value,
        };

        let products = [];
        document.querySelectorAll(".checkout-info").forEach(product => {
            products.push({
                name: product.getAttribute("data-name"),
                size: product.getAttribute("data-size"),
                price: product.getAttribute("data-price"),
                quantity: product.getAttribute("data-quantity")
            });
        });

        let productTable = "<table border='1' cellspacing='0' cellpadding='5'>";
        productTable += "<tr><th>Naziv</th><th>Veličina</th><th>Cena</th><th>Količina</th></tr>";
        products.forEach(p => {
            productTable += `<tr>
                <td>${p.name}</td>
                <td>${p.size}</td>
                <td>${p.price}</td>
                <td>${p.quantity}</td>
            </tr>`;
        });
        productTable += "</table>";

        emailjs.send("service_m2sakc4", "template_f1k5fs7", {
            ...formData,
            product_list: productTable
        }, "Q2v33nzqBM2C8eHF6")
        .then(response => {
            
            console.log("Porudžbina poslata!", response);

              // ✅ 1. Zatvaranje checkout prozora
        document.getElementById("checkoutModal").style.display = "none";

       // ✅ 2. Prikazivanje zahvalnog prozora
        document.getElementById("thankYouModal").style.display = "grid";
        


        }).catch(error => {
            alert("Greška pri slanju: " + JSON.stringify(error));
            console.log("Greška pri slanju:", error);
        });

        return false;  // Sprečava refresh na starim browserima
    });
});

document.getElementById("closeThankYou").onclick = function () {
    document.getElementById("thankYouModal").style.display = "none";
    clearCart();
};