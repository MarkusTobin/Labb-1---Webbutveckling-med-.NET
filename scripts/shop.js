const products = [
    { name: "Simba", age: 4, race: "Norwegian Forest Cat", price: 50, imageURL: "/media/norwegian-forest-cat-7072128_640.jpg" },
    { name: "Luna", age: 2, race: "Maine Coon", price: 120, imageURL: "/media/mainecoon.jpg" },
    { name: "Whiskers", age: 3, race: "British Shorthair", price: 90, imageURL: "/media/Briishshorthair.jpg" },
    { name: "Milo", age: 1, race: "Siamese", price: 100, imageURL: "/media/siamesse.jpg" },
    { name: "Cleo", age: 5, race: "Bengal", price: 150, imageURL: "/media/bengal.jpg" },
    { name: "Oreo", age: 2, race: "Scottish Fold", price: 110, imageURL: "/media/scottishfold.jpg" },
    { name: "Shadow", age: 4, race: "Russian Blue", price: 130, imageURL: "/media/russianblue.jpeg" },
    { name: "Ginger", age: 3, race: "Abyssinian", price: 140, imageURL: "/media/abyssinian.jpg" },
    { name: "Nala", age: 1, race: "Persian", price: 160, imageURL: "/media/persian.jpg" },
    { name: "Felix", age: 6, race: "Ragdoll", price: 170, imageURL: "/media/cute-blue-mitted-ragdoll-cat-600nw-2235376213.webp" }
];

let cart = [];

const createProductCard = (cat, index) => `
    <div class="col-md-4 mb-4">
        <div class="item h-100 shadow-sm">
            <img src="${cat.imageURL}" class="item-img-top product-image" alt="${cat.name}">
            <div class="item-body">
                <h5 class="item-title">${cat.name}</h5>
                <p class="item-text"><strong>Breed:</strong> ${cat.race}</p>
                <p class="item-text"><strong>Age:</strong> ${cat.age} years</p>
                <p class="item-text"><strong>Price:</strong> $${cat.price}</p>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#catModal${index}">Show more</button>
                <button class="btn btn-success" id="addButton${index}" onclick="addToCart(${index}, this)">Add</button>
            </div>
        </div>
        ${createModal(cat, index)}
    </div>
`;

const createModal = (cat, index) => `
    <div class="modal fade" id="catModal${index}" tabindex="-1" aria-labelledby="catModalLabel${index}" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="catModalLabel${index}">${cat.name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <img src="${cat.imageURL}" class="img-fluid mb-3" alt="${cat.name}">
                    <p><strong>Breed:</strong> ${cat.race}</p>
                    <p><strong>Age:</strong> ${cat.age} years</p>
                    <p><strong>Price:</strong> $${cat.price}</p>
                    <p><strong>Description:</strong> A cute and charming ${cat.race} by the name ${cat.name}.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
`;

const showProducts = () => {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = products.map((cat, index) => createProductCard(cat, index)).join('');
    updateCart();
};

const addToCart = (index, button) => {
    const product = products[index];
    cart.push(product);
    button.disabled = true;
    updateCart();
    updateCheckoutButton();
};

const updateCart = () => {
    const cartTotal = document.getElementById("cartTotal");
    const cartItems = document.getElementById("cartItems");
    
    const totalPrice = cart.reduce((total, cat) => total + cat.price, 0);
    cartTotal.textContent = `$${totalPrice}`;

    cartItems.innerHTML = cart.map((cat, index) => `
        <div class="cart-item">
            <p>${cat.name} - $${cat.price} 
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
            </p>
        </div>
    `).join('');
};

const removeFromCart = (index) => {
    const removedProduct = cart.splice(index, 1)[0];
    updateCart();
    updateCheckoutButton();

    const productIndex = products.findIndex(product => product.name === removedProduct.name);
    const addButton = document.getElementById(`addButton${productIndex}`);
    if (addButton) {
        addButton.disabled = false;
    }    
};

function updateCheckoutButton(){
    const checkOutButton = document.getElementById("checkOutButton");
    checkOutButton.disabled = cart.length === 0;
};

function goToCheckOut() {
    if (cart.length === 0) {
        return;
    }

    let cartSum = cart.map(cat => `${cat.name} - $${cat.price}`).join("\n");
    let totalPrice = cart.reduce((total, cat) => total + cat.price, 0);

    let confirmBuy = confirm(`You are purchasing:\n${cartSum}\n\nTotal Price: $${totalPrice}\n\nConfirm purchase?`);
    
    if(confirmBuy) {
        alert("Thank you for your money!");
        cart = [];
        updateCart();
        updateCheckoutButton();
    } else {
        alert("Purchase canceled.");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const cartSummary = document.createElement("div");
    cartSummary.id = "cartSummary";
    cartSummary.classList.add("cart-summary");
    cartSummary.innerHTML = `
        <h5>Cart</h5>
        <p>Total: <span id="cartTotal">$0</span></p>
        <button id="checkOutButton" class="btn btn-success btn-sm" onclick="goToCheckOut()">Go to Checkout</button>
        <div id="cartItems"></div>
    `;
    document.body.appendChild(cartSummary);

    showProducts();
    updateCheckoutButton();
});
