// ===== CART SETUP =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");

// ===== UPDATE CART UI =====
function updateCartUI() {
    cartCount.innerText = cart.length;
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        let li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ₹${item.price}
            <button onclick="removeFromCart(${index})">❌</button>
        `;
        cartItems.appendChild(li);
    });

    if (cart.length > 0) {
        let totalLi = document.createElement("li");
        totalLi.style.fontWeight = "bold";
        totalLi.innerText = `Total: ₹${total}`;
        cartItems.appendChild(totalLi);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

// ===== ADD TO CART =====
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

// ===== REMOVE FROM CART =====
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// ===== LOAD CART ON PAGE LOAD =====
updateCartUI();

// ===== FILTER BY CATEGORY =====
function filterCategory(category) {
    document.querySelectorAll(".product").forEach(product => {
        product.style.display =
            category === "all" || product.dataset.category === category
                ? "block"
                : "none";
    });
}

// ===== SEARCH PRODUCTS =====
function searchProducts() {
    const input = document.getElementById("search").value.toLowerCase();
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const name = product.querySelector("h3").innerText.toLowerCase();
        product.style.display = name.includes(input) ? "block" : "none";
    });
}
