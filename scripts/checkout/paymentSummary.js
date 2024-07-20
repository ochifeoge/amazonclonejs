import { cart, calculateCartQuantity} from "../../data/cart.js";
import { getMatchingProducts } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formartCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";


   export function renderPaymentSummary () {

        let productPriceCents = 0;
        let ShippingPriceCents = 0;
       

        cart.forEach((cartItem)=> {
           const product = getMatchingProducts(cartItem.productId);
            productPriceCents += product.priceCents * cartItem.quantity;

            const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
            ShippingPriceCents += deliveryOption.priceCents;

        });
        
        const cartQuantity = calculateCartQuantity();
        const totalBeforeTaxCents = productPriceCents + ShippingPriceCents;
        const taxCents = totalBeforeTaxCents * 0.1;
        const totalCents = totalBeforeTaxCents + taxCents;
        
        const paymentSummaryHTML =  `
           
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formartCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formartCurrency(ShippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formartCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formartCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formartCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
        `
        document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;


        document.querySelector('.js-place-order').addEventListener('click', async () => {
          try{
            const response = await fetch('https://supersimplebackend.dev/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                cart: cart
              })
            });
  
           const order = await response.json();
           
           addOrder(order);
          } catch (error) {
            console.log('Unexpected error, try agian later.')
          }

          window.location.href = 'orders.html'

          
        });
       
    }