function undo(i) {
    cart[i].amount = 1;
    displayCart();
};

function removeFromCart(i) {
    cart.splice(i, 1);
    displayCart();
}

function manipulateAmount(man, index) {
    cart[index].amount += man;
    displayCart();
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