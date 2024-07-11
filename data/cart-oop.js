    function Cart(localStorageKey) {
        const cart = {
            cartItems: undefined,
        
            loadFromStorage() {
                this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
        
                if (!this.cartItems) {
                    this.cartItems = [{
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
            },
            saveToStorage() {
                localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
            },
            addToCart(productId, quantity) {
                
                let matchingItem;
        
                this.cartItems.forEach((cartItem) =>{
                if (cartItem.id === productId){
                    matchingItem = cartItem;
                }
                });
                
                if (matchingItem) {
                 matchingItem.quantity += quantity;
                } else {
                    this.cartItems.push({
                     productId,
                     quantity: quantity,
                     deliveryOptionId: '2'
                    });
                    
                };
                this.saveToStorage();
                
            },
            deleteFromCart(deleteId){
            
                let newCart = [];
            
                this.cartItems.forEach((cartItem) => {
                    if (cartItem.productId != deleteId) {
                        newCart.push(cartItem);
                    }
                });
            
                this.cartItems = newCart;
            
                this.saveToStorage();
            },
            calculateCartQuantity() {
                let cartQuantity = 0;
                this.cartItems.forEach((item) =>{
                cartQuantity += item.quantity;
                });
                return cartQuantity;
            },
            updateQuantyonCartPage(productId, newQuantity){
                const matchingCart = getMatchingProducts(productId);
                matchingCart.quantity = newQuantity;
                document.querySelector(`.js-quantity-label-${productId}`).innerHTML = matchingCart.quantity;
            },
        
        
            updateDeliveryOption(productId, deliveryOptionId) {
                    const matchingItem = getMatchingProducts(productId);
                    matchingItem.deliveryOptionId = deliveryOptionId;
                    this.saveToStorage();
                }
         };

        return cart;
    }
  
    const cart = Cart('cartcopy-oop');
    const businessCart = Cart('cart-business');

    cart.loadFromStorage();
    businessCart.loadFromStorage();
    console.log(cart)
    console.log(businessCart)
    








