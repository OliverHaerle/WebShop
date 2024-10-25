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
            <div class="item-name">
                <span>${item.name} - ${item.color}</span> <br>
                <span>size: ${item.size}</span>
            </div>
            <div class="handle-amount">
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

            <div id="amount-container${i}" class="change-amount">
                <button onclick="manipulateAmount(-1, ${i})">
                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#000000" fill-rule="evenodd" d="M18 10a1 1 0 01-1 1H3a1 1 0 110-2h14a1 1 0 011 1z"/></svg>                </button>
                        <span>${amount}</span>
                <button onclick="manipulateAmount(1, ${i})">
                    <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-362.000000, -1037.000000)" fill="#000000"><path d="M390,1049 L382,1049 L382,1041 C382,1038.79 380.209,1037 378,1037 C375.791,1037 374,1038.79 374,1041 L374,1049 L366,1049 C363.791,1049 362,1050.79 362,1053 C362,1055.21 363.791,1057 366,1057 L374,1057 L374,1065 C374,1067.21 375.791,1069 378,1069 C380.209,1069 382,1067.21 382,1065 L382,1057 L390,1057 C392.209,1057 394,1055.21 394,1053 C394,1050.79 392.209,1049 390,1049" id="plus" sketch:type="MSShapeGroup"></path></g></g></svg>                
                </button>
            </div>
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




