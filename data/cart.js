

export let cart;

loadFromStorage();

   export function loadFromStorage() {
        cart = JSON.parse(localStorage.getItem('cartcopy'));

        if (!cart) {
            cart = [];
        }
    }

export function saveToStorage() {
    localStorage.setItem('cartcopy', JSON.stringify(cart));
}

export function getMatchingProducts(productId) {
    let matchingItem;

    cart.forEach((item) =>{
     if (productId === item.productId){
         matchingItem = item;
     }
    });
    return matchingItem;
}

export function addToCart(productId, quantity) {
    const matchingItem = getMatchingProducts(productId);
    
    if (matchingItem) {
     matchingItem.quantity += quantity;
    } else {
        cart.push({
         productId,
         quantity: quantity,
         deliveryOptionId: '2'
        });
        
    };
    saveToStorage();
    
}

export function deleteFromCart(deleteId){
    
    let newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId != deleteId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorage();
}

export function calculateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((item) =>{
    cartQuantity += item.quantity;
    });
    return cartQuantity;
}
export function updateQuantyonCartPage(productId, newQuantity){
    const matchingCart = getMatchingProducts(productId);
    matchingCart.quantity = newQuantity;
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = matchingCart.quantity;
}

   export function updateDeliveryOption(productId, deliveryOptionId) {
        const matchingItem = getMatchingProducts(productId);
        matchingItem.deliveryOptionId = deliveryOptionId;
        saveToStorage();
    }

    export function loadCart(fun) {
        const xhr = new XMLHttpRequest();
    
        xhr.addEventListener('load', () =>{
          console.log(xhr.response);
          fun();
        });
        xhr.open('GET', 'https://supersimplebackend.dev/cart');
        xhr.send();
    
      }

    export async function loadCartFetch() {
        const response = await fetch('https://supersimplebackend.dev/cart');

        const cartBackend = await response.text();

        console.log(cartBackend);
        return cartBackend;
    }