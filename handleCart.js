function undo(i) {
    cart[i].amount = 1;
    displayCart();
};

function removeFromCart(i) {
    cart.splice(i, 1);
    displayCart();
}

function manipulateAmount(inc, index) {
    cart[index].amount += inc;
    displayCart();

    findClothingItem(inc, cart[index].name, cart[index].color, cart[index].size)
}

function findClothingItem(inc, name, color, size) {
    const item = clothes.find(item =>
        item.name === name &&
        item.color === color &&
        item.stock[color]
    );
    
    const itemInStock = item.stock[color][size]-=inc;
    console.log(itemInStock)
}


function saveCart() {
    cartString = JSON.stringify(cart);
    localStorage.setItem('cart', cartString);
};

function retrieveCart() {
    const retrievedCartString = localStorage.getItem('cart');

    if (retrievedCartString) {
        const retrievedArray = JSON.parse(retrievedCartString);
        cart = retrievedArray;
        displayCart();
    }
}

