function undo(i) {
    cart[i].amount = 1;
    displayCart();
};

function removeFromCart(i) {
    cart.splice(i, 1);
    displayCart();
}

function manipulateAmount(inc, index) {
    const itemName = cart[index].name;
    const itemColor = cart[index].color;
    const itemSize = cart[index].size;

    let itemInStock = clothes.find(item => item.name === itemName);

    if (itemInStock.stock[itemColor][itemSize] < 1 && inc == 1) {
        alert('Out of Stock')
        outOfStock();
    } else {
        cart[index].amount += inc;
        itemInStock.stock[itemColor][itemSize] -= inc;
    }
    displayCart();
}

function saveCart() {
    cartString = JSON.stringify(cart);
    localStorage.setItem('cart', cartString);
};

function outOfStock() {

}

function retrieveCart() {
    const retrievedCartString = localStorage.getItem('cart');

    if (retrievedCartString) {
        const retrievedArray = JSON.parse(retrievedCartString);
        cart = retrievedArray;
        displayCart();
    }
}

