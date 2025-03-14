window.onload = function () {
    updateCartCount();


    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");

    cartContainer.innerHTML = "";

    let total = 0;

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
    document.getElementById("checkoutModal").style.display = "block";
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
                <div class="checkout-info">
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