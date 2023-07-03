import {App} from './../app.js';

export class ProductItem {
    constructor(productObject) {
        this.productObject = productObject;
        this.productObject.quantity = 0;
        this.productObject.sum = 0;
    }

    render(hookElement){
        this.productElement = document.createElement('div');
        this.productElement.id = this.productObject.id;
        this.productElement.className = 'product';
        this.productElement.innerHTML = `
        <h2 class="product__title">${ this.productObject.title}</h2>
        <img class="product__image" src="${ this.productObject.imageUrl}" alt="${ this.productObject.title}">
        <p class="product__price">${ this.productObject.price}$</p>
        <input class="product__quantity" type="number" value="1" min="1">
        `;

        this.productElementButton = document.createElement('button');
        this.productElementButton.className = 'product__button';
        this.productElementButton.innerText = 'Add to cart';
        this.productElementButton.addEventListener('click', this.addToCart.bind(this));

        this.productElement.appendChild(this.productElementButton);
        hookElement.appendChild(this.productElement);
    }

    addToCart(){
        const quantity = +this.productElement.querySelector('.product__quantity').value;
        App.addToCart(this.productObject, quantity)
    }
}