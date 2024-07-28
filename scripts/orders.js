import { orders } from "../data/orders.js";
import { formartCurrency } from "./utils/money.js";
import { getMatchingProducts, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { addToCart, cart } from "../data/cart.js";

async function loadpage(){
    
    await loadProductsFetch();

    let orderHtml = '';
    orders.forEach((order)=>{

    const orderId = order.id;
    const orderTime = dayjs(order.orderTime).format('MMMM D');
    const totalCost = formartCurrency(order.totalCostCents);


     orderHtml += `
        
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTime}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${totalCost}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderId}</div>
            </div>
          </div>

          <div class="order-details-grid">
          ${productsListHTML(order)}
            
          </div>
        </div>
    `
});

    function productsListHTML(order){
        let productsListHTML = '';

        order.products.forEach((productDetails) => {

            const productId = productDetails.productId
            const matchingItem = getMatchingProducts(productId);
            const quantity = productDetails.quantity;
        

            productsListHTML +=
                `
                <div class="product-image-container">
              <img src="${matchingItem.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${
                    dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
                  }
              </div>
              <div class="product-quantity">
                ${quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again" data-product-id="${productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
                `;
        });

        return productsListHTML;
    }

    document.querySelector('.js-order-grid').innerHTML = orderHtml;

    document.querySelectorAll('.js-buy-again')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const {productId} = button.dataset;
            console.log(productId);
            addToCart(productId, 1);
            button.innerHTML = 'Added';
            setTimeout(() => {
                button.innerHTML = `<img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>`
            }, 1000);
            console.log(cart)
            
        });
    });
}

loadpage();