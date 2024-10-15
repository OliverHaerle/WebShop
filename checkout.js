cart = [];

const cartContainer = document.querySelector('.cart');

window.addEventListener('DOMContentLoaded', function () {
    retrieveCart();
});

function displayCart() {
    let displayCart = cart.map((item, i) => {

        handleAmount = checkAmount(item.amount, i)

        return `
        <article>
            <img src="./img/clothes/${item.color}/${item.name}.png ">
            <div>
                <span>${item.name} - ${item.color}</span> <br>
                <span>size:</span>
            </div>
            <div>
                ${handleAmount}
            </div>
            <span>subtotal: $${item.amount * item.price}</span>
        </article>
        `
    }).join('');

    cartContainer.innerHTML = checkIfCartEmpty(displayCart)
    saveCart();
}

function checkAmount(amount, i) {
    if (amount == 0) {
        return `
            <button class="undo-remove" onclick="undo(${i})">undo</button>
            <button class="undo-remove" onclick="removeFromCart(${i})">remove</button>
        `
    } else {
        return `
        <button onclick="manipulateAmount(-1, ${i})">-</button>
        <span>${amount}</span>
        <button onclick="manipulateAmount(1, ${i})">+</button>
        `
    }
}

function checkIfCartEmpty(displayCart) {
    if (cart.length == 0) {
        return 'Your cart is empty. <a href="index.html">Go shop?</a>'
    } else {
        return displayCart + '<span class="black-line-price"></span>'
    }
}




