import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage} from "../../data/cart.js";
import { products } from "../../data/products.js";

const productId1 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";

describe('test suit: renderOrderSummary', () => {
    it('displays the cart', () => {
        document.querySelector('.js-test-container')
            .innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-return-to-home-link"></div>
            <div class="js-payment-summary"></div>

        `;

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                quantity: 2,
                deliveryOptionId: '1',
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });
    
        loadFromStorage();
        renderOrderSummary();

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2)

    });


    it('removes a product', () => {
        document.querySelector('.js-test-container')
        .innerHTML = `
        <div class="js-order-summary"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
            productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            quantity: 2,
            deliveryOptionId: '1',
        },
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: '2'
        }]);
    });

    loadFromStorage();

    renderOrderSummary();

    document.querySelector(`.js-delete-link-${productId1}`).click();
    });

    expect(
        document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1)

});