cart = [];
let price = 0;

const tester = document.querySelector('.test');

const clothesContainer = document.querySelector('.clothes-container');
const cartContainer = document.querySelector('.cart');
const bigView = document.querySelector('.big-view');

window.addEventListener('DOMContentLoaded', function () {
    displayClothingItems();
    retrieveCart();
    retrieveInventory();
});

function displayClothingItems() {
    let displayedItems = clothes.map((item, index) => {
        const colorButtons = item.colors.map((color, colorIndex) => {
            return `<button class="color-picker-btn ${color}" onclick="changeColor(${colorIndex}, ${index})"></button>`
        }).join('');

        const sizeOptions = Object.keys(item.stock.white).map((stockKey) => {
            return `<option value="${stockKey}">${stockKey}</option>`;
        }).join('');

        return `
    <article>
        <div class="item-container">
            <h4 class="name">${item.name}</h4>
            <img onclick="showItem(${index})" id="item${index}" class="clothes-img" src="${item.img}" alt="${item.img}">
            <div class="color-picker-container">${colorButtons}</div>
            <select id="size${index}" class="color-picker-container">${sizeOptions}</select>
            <div onclick="checkStock(${index})" class="add-to-cart-container">
                <img class="add-to-cart" src="./img/shopping cart/add-to-cart.png">
            </div>
        </div>
        <div class="price-and-material">
            <span class="price">Price: $${item.price}</span>
            <span class="material">Material: ${item.material}</span>
            <div class="black-line"></div>
        </div>
    </article>`
    });
    displayedItems = displayedItems.join('');
    clothesContainer.innerHTML = displayedItems;
};

function showItem(i) {
    document.body.style.overflow = 'hidden';
    const bigView = document.getElementById('big-view');
    bigView.classList.remove('d-none'); // Make it visible immediately

    // Add the 'visible' class slightly delayed to trigger the transition
    setTimeout(() => {
        bigView.classList.add('visible'); // Trigger fade-in transition
    }, 10); // A very short delay to allow the browser to register the class removal

    // Populate the inner content
    bigView.innerHTML = `
    <article id="big-view-article">
        <img class="big-view-img" src="./img/clothes/${clothes[i].color}/${clothes[i].name}.png">
        <span class="big-view-desc">${clothes[i].description}</span>
        <img class="big-view-close" id="close" src="./img/close.png" alt="close">
    </article>
    `;
}


function hideItem(event) {
    if (event.target.id === "big-view" || event.target.id === "close") {
        bigView.classList.add('d-none');
        bigView.classList.remove('visible');
        document.body.style.overflow = 'auto';
    }
}

function changeColor(colorIndex, index) {
    const item = document.getElementById(`item${index}`);
    const itemName = clothes[index].name;
    const itemColor = clothes[index].colors[colorIndex];
    item.src = `./img/clothes/${itemColor}/${itemName}.png`;

    // register and save the current color in the clothes-array (needed for cart)
    clothes[index].color = itemColor;
};

function checkStock(i) {
    const chosenSize = document.getElementById(`size${i}`).value;

    let chosenItem = clothes[i].stock[clothes[i].color];

    if (chosenItem[chosenSize] > 0) {
        chosenItem[chosenSize]--;
        addToCart(i, chosenSize);
    } else {
        alert('out of stock')
    }
};

function addToCart(i, chosenSize) {
    const item = { ...clothes[i] };
    item.size = chosenSize;

    // Check if an item with the same color, size, and name already exists in cart
    const existingItem = cart.find(cartItem => cartItem.name === item.name && cartItem.color === item.color && cartItem.size === item.size);

    if (existingItem) {
        existingItem.amount++
    } else {
        item.amount = 1;
        cart.push(item)
    };

    displayCart();
    saveInventory();
};

function displayCart() {
    let displayCart = cart.map((item, i) => {

        if (item.amount == 0) {
            return `
            <article class="delete-and-undo">
                <button class="undo-remove" onclick="manipulateAmount(1, ${i})">undo</button>
                <button class="undo-remove" onclick="removeFromCart(${i})">remove</button>
            </article>
            `
        } else {

            return `
        <div id="cart-item${i}" class="cart-item">
            <b>${item.amount}x</b> ${item.name} - ${item.color} - ${item.size} <br> $${item.amount * item.price}
            <div id="amount-container${i}" class="change-amount">
                <button onclick="manipulateAmount(-1, ${i})">
                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#000000" fill-rule="evenodd" d="M18 10a1 1 0 01-1 1H3a1 1 0 110-2h14a1 1 0 011 1z"/></svg>                </button>
                <button onclick="manipulateAmount(1, ${i})">
                    <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-362.000000, -1037.000000)" fill="#000000"><path d="M390,1049 L382,1049 L382,1041 C382,1038.79 380.209,1037 378,1037 C375.791,1037 374,1038.79 374,1041 L374,1049 L366,1049 C363.791,1049 362,1050.79 362,1053 C362,1055.21 363.791,1057 366,1057 L374,1057 L374,1065 C374,1067.21 375.791,1069 378,1069 C380.209,1069 382,1067.21 382,1065 L382,1057 L390,1057 C392.209,1057 394,1055.21 394,1053 C394,1050.79 392.209,1049 390,1049" id="plus" sketch:type="MSShapeGroup"></path></g></g></svg>                
                </button>
            </div>
        </div>
            `
        }
    }).join('');

    if (cart.length == 0) {
        cartContainer.innerHTML = 'Your cart is empty.'
    } else {
        cartContainer.innerHTML = displayCart + '<span class="black-line-price"></span>'
    }

    displayPrice();
    saveCart();
};

function displayPrice() {
    price = 0;
    cart.forEach(itemInCart => {
        price += itemInCart.amount * itemInCart.price;
    });
    if (cart.length > 0) {
        priceContainer.innerHTML = '<b>Total:</b> $' + price + '<br><br> <a href="checkout.html" target=”_blank”> Your Cart </a>';
    } else {
        priceContainer.innerHTML = ''
    }
};

function emptyCart() {
    cart = [];
    displayCart();
};