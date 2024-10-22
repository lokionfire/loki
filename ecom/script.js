const productListDiv = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');
const checkoutButton = document.getElementById('checkout-button');
let cart = [];

async function loadProducts() {
    const response = await fetch('/products');
    const products = await response.json();
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        productListDiv.appendChild(productDiv);
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartList();
}

function updateCartList() {
    cartList.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
    });
}

checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Proceeding to checkout!');
    // Here, you could integrate a payment process or redirect to a checkout page
    cart = [];
    updateCartList();
});

loadProducts();
