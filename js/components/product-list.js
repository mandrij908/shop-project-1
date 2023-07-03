import {ProductItem} from './product-item.js';

export class ProductList {
    constructor(arr, hookElement) {
        if(!arr || !arr.length){
            return;
        }

        this.hookElement = document.querySelector(hookElement);
        this.productList = [];
        for(let item in arr){
            const productItem = new ProductItem(arr[item]);
            this.productList.push(productItem);
        }
    }

    render(){
        const productListElement = document.createElement('div');
        productListElement.className = 'product-list';
        this.hookElement.appendChild(productListElement);

        for(let item in this.productList){
            this.productList[item].render(productListElement);
        }
    }
}