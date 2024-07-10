

export let cart;

loadFromStorage();

   export function loadFromStorage() {
        cart = JSON.parse(localStorage.getItem('cartcopy'));

        if (!cart) {
            cart = [{
                productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                quantity: 2,
                deliveryOptionId: '1',
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: '2'
            }];
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