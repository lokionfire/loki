const menuDiv = document.getElementById('menu');
const orderList = document.getElementById('orderList');
const submitOrderButton = document.getElementById('submitOrder');
let order = [];

async function loadMenu() {
    const response = await fetch('/menu');
    const menu = await response.json();
    menu.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item';
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <button onclick="addToOrder('${item.name}', ${item.price})">Add to Order</button>
        `;
        menuDiv.appendChild(itemDiv);
    });
}

function addToOrder(name, price) {
    order.push({ name, price });
    updateOrderList();
}

function updateOrderList() {
    orderList.innerHTML = '';
    order.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        orderList.appendChild(li);
    });
}

submitOrderButton.addEventListener('click', async () => {
    if (order.length === 0) {
        alert('Your order is empty!');
        return;
    }

    const response = await fetch('/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });

    if (response.ok) {
        alert('Order submitted successfully!');
        order = [];
        updateOrderList();
    } else {
        alert('Failed to submit order. Please try again.');
    }
});

loadMenu();
