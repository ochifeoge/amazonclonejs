import { cart, addToCart } from "../data/cart.js";
import {products} from "../data/products.js"
import { formartCurrency } from "./utils/money.js";
import { calculateCartQuantity } from "../data/cart.js";

    let productsHTML = '';
products.forEach((product)=>{
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
        <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
            ${product.rating.count}
        </div>
        </div>

        <div class="product-price">
        ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
        Add to Cart
        </button>
    </div>
    `;
});

    document.querySelector('.js-products-grid')
        .innerHTML = productsHTML;

    updateQuantityOnPage();
    
    function updateQuantityOnPage(){
           const cartQuantity = calculateCartQuantity();
           
            cartQuantity === 0 ? document.querySelector('.js-cart-quantity')
            .innerText = '' : document.querySelector('.js-cart-quantity')
            .innerText = cartQuantity;            
        }
        
        function renderAddToCartMessage(productId, addedMessageTimeoutId) {
            const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

            addedMessage.classList.add("added-to-cart-visible");
            
           if (addedMessageTimeoutId) {
                clearTimeout(addedMessageTimeoutId)
           }
           const timeoutId = setTimeout(() => {
                addedMessage.classList.remove("added-to-cart-visible")
                
            }, 2000);
            
            addedMessageTimeoutId = timeoutId;
        }

        let addedMessageTimeoutId; 
    document.querySelectorAll('.js-add-to-cart')
        .forEach((addBtn)=>{
            addBtn.addEventListener('click', ()=>{
               /* const productId = addBtn.dataset.productId; */
               const {productId} = addBtn.dataset;
               const cartQuantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
               const quantity = Number(cartQuantitySelector.value);
                addToCart(productId, quantity);
                console.log(cart)
                updateQuantityOnPage();
                renderAddToCartMessage(productId, addedMessageTimeoutId);
               
            });
           
            
        });

            
            