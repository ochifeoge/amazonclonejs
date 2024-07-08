import { formartCurrency } from "../scripts/utils/money.js";

console.log('test suite: formatCurrency');

console.log('converts cents into dollars')

if (formartCurrency(2095) === '20.95') {
    console.log('passed')
} else console.log('failed');

console.log('works with zero')
if (formartCurrency(0) === '0.00' ){
    console.log('passed')
} else console.log('failed')

console.log('rounds up to the nearest cent')
if (formartCurrency(2000.5) === "20.01"){
    console.log('passed')
} else console.log('failed')
