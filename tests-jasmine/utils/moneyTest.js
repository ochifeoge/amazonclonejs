import { formartCurrency } from "../../scripts/utils/money.js";

describe('test suit: formatCurrency', () => {
    it('converts cents into dollars', () => {
        expect(formartCurrency(2095)).toEqual('20.95');
    });
    it('works with zero', () => {
       expect(formartCurrency(0)).toEqual('0.00') 
    });
    it('rounds up to the nearest cent', () => {
        expect(formartCurrency(2000.5)).toEqual('20.01')
    });
});