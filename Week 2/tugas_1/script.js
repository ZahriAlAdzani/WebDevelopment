const itemList = document.querySelectorAll(".add-to-cart");
const cartList = document.getElementById("cart-list");
const totalElement = document.getElementById("total");
const taxElement = document.getElementById("tax");
const grandTotalElement = document.getElementById("grand-total");
const addItemButtons = document.querySelectorAll(".add-to-cart");
const removeItemButtons = document.querySelectorAll(".remove-from-cart");

let cart = [];



removeItemButtons.forEach((item) => {
    item.addEventListener("click", () => {
        const itemName = item.parentElement.querySelector(".item-name").textContent;
        const itemPrice = parseFloat(item.getAttribute("data-price"));
        removeFromCart(itemName, itemPrice);
        updateCart();
    });
});


itemList.forEach((item) => {
    item.addEventListener("click", () => {
        const itemName = item.parentElement.querySelector(".item-name").textContent;
        const itemPrice = parseFloat(item.getAttribute("data-price"));
        addToCart(itemName, itemPrice);
        updateCart();
    });
});

function addToCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1,
        });
    }
}

function removeFromCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
        if (existingItem.quantity > 0) {
            existingItem.quantity--;
        } else {
            cart = cart.filter((item) => item.name !== name);
        }
    }
}

function updateCart() {
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} x${item.quantity} - $.${(item.price * item.quantity).toFixed(2)}`;
        cartList.appendChild(li);
        total += item.price * item.quantity;
    });

    const taxRate = 0.22; // 22% tax rate
    const tax = total * taxRate;
    const grandTotal = total + tax;

    totalElement.textContent = total.toFixed(2);
    taxElement.textContent = tax.toFixed(2);
    grandTotalElement.textContent = grandTotal.toFixed(2);
}


document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById("item-list");

    // Load data from JSON file
    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            // Iterate through the products and create list items
            data.forEach(product => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" />
                    <span class="item-name">${product.name}</span> $.${product.price}
                    <button class="remove-from-cart" data-price="${product.price}">Remove</button>
                    <button class="add-to-cart" data-price="${product.price}">Add</button>
                `;
                productList.appendChild(listItem);
            });

            // Set up event listeners after adding dynamic items
            const itemList = document.querySelectorAll(".add-to-cart");
            const removeItemButtons = document.querySelectorAll(".remove-from-cart");

            itemList.forEach((item) => {
                item.addEventListener("click", () => {
                    const itemName = item.parentElement.querySelector(".item-name").textContent;
                    const itemPrice = parseFloat(item.getAttribute("data-price"));
                    addToCart(itemName, itemPrice);
                    updateCart();
                });
            });

            removeItemButtons.forEach((item) => {
                item.addEventListener("click", () => {
                    const itemName = item.parentElement.querySelector(".item-name").textContent;
                    const itemPrice = parseFloat(item.getAttribute("data-price"));
                    removeFromCart(itemName, itemPrice);
                    updateCart();
                });
            });
        })
        .catch(error => {
            console.error("Error loading product data:", error);
        });
});
