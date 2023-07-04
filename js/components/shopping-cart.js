import {App} from './../app.js';

export class ShoppingCart {
    constructor() {
        this.productsInCart = [];
        this.cartElement = document.querySelector('.shopping-cart');
        this.productCounderElement = document.querySelector('.shopping-cart__counter');
        this.productIconElement = document.querySelector('.shopping-cart__icon');
        this.productCounderElement.addEventListener('click', this.toggleCheckoutVisibility.bind(this));
        this.productIconElement.addEventListener('click', this.toggleCheckoutVisibility.bind(this));
        this.checkoutCreated = false;
        this.checkoutFullSum = 0;
    }

    addToCat(productObject, quantity){
        productObject.quantity = +quantity;
        productObject.sum = +quantity * productObject.price;

        /*duplicate check*/
        if(!this.productsInCart.length){
            this.productsInCart.push(productObject);
        } else{
            let duplicate = false;
            for(let product of this.productsInCart){
                if(productObject.id === product.id){
                    alert('this product is already in cart');
                    duplicate = true;
                    return;
                }
            }
            if(!duplicate){
                this.productsInCart.push(productObject);
            }
        }

        /*render functions*/
        this.updateCounter();
        this.createCheckout();
        this.updateCheckout();
        this.updateFullSum();
    }

    updateCounter(){
        this.productCounderElement.textContent = this.productsInCart.length.toString();
    }

    createCheckout(){
        if(this.checkoutCreated){
            return;
        }

        /*create checkout*/
        this.cartElement.classList.add('shopping-cart--not-empty', );
        this.checkoutElement = document.createElement('div');
        this.checkoutElement.className = 'checkout';
        this.checkoutListElement = document.createElement('ul');
        this.checkoutListElement.className = 'checkout__list';
        this.checkoutElement.appendChild(this.checkoutListElement);

        /*create checkout__summary*/
        this.checkoutSummaryElement = document.createElement('div');
        this.checkoutSummaryElement.className = 'checkout__summary';

        /*create checkout__full-sum*/
        this.checkoutFullSumElement = document.createElement('p');
        this.checkoutFullSumElement.className = 'checkout__full-sum';
        this.checkoutFullSumElement.textContent = '0';
        this.checkoutSummaryElement.appendChild(this.checkoutFullSumElement);

        /*create checkout__submit*/
        this.checkoutSubmitSumElement = document.createElement('button');
        this.checkoutSubmitSumElement.className = 'checkout__submit btn';
        this.checkoutSubmitSumElement.textContent = 'Order';
        this.checkoutSummaryElement.appendChild(this.checkoutSubmitSumElement);

        /*append to DOM*/
        this.checkoutElement.appendChild(this.checkoutSummaryElement);
        this.cartElement.appendChild(this.checkoutElement);
        this.checkoutCreated = true
    }

    updateCheckout(){
        this.checkoutListElement.innerHTML = '';

        for (let product of this.productsInCart){
            const checkoutListItem = document.createElement('li');
            checkoutListItem.className = 'checkout__item';
            checkoutListItem.id = `checkout__item-${product.id}`;
            checkoutListItem.innerHTML = `
                <img class="checkout__image" src="${product.imageUrl}" alt="${product.title}">
                <h2 class="checkout__title">${product.title}</h2>
                <p class="checkout__sum">${product.sum}</p>
                <p class="checkout__id">${product.id}</p>`;

            /*create checkout__quantity*/
            const checkoutQuantityElement = document.createElement('input');
            checkoutQuantityElement.className = 'checkout__quantity';
            checkoutQuantityElement.type = 'number';
            checkoutQuantityElement.setAttribute('min', '1');
            checkoutQuantityElement.setAttribute('value',  product.quantity);
            checkoutQuantityElement.addEventListener('input', this.changeQuantity.bind(this, product.id, checkoutQuantityElement));
            checkoutListItem.appendChild(checkoutQuantityElement);

            /*create checkout__remove-element*/
            const removeProductElement = document.createElement('div');
            removeProductElement.className = 'checkout__remove-element';
            removeProductElement.addEventListener('click', this.removeProduct.bind(this, product.id));
            checkoutListItem.appendChild(removeProductElement);

            /*append to DOM*/
            this.checkoutListElement.appendChild(checkoutListItem);
        }
    }

    changeQuantity(id, checkoutQuantityElement){
        checkoutQuantityElement.setAttribute('value', checkoutQuantityElement.value);
        for (let product of this.productsInCart){
            if(product.id === id){
                product.quantity = +checkoutQuantityElement.value;
                product.sum = +checkoutQuantityElement.value * product.price;
                document.querySelector( `#checkout__item-${product.id} .checkout__sum`).textContent = product.sum;
                this.updateFullSum();
            }
        }
    }

    toggleCheckoutVisibility(){
        if(!this.checkoutCreated){
            return;
        }
        App.toggleModals();
    }

    updateFullSum(){
        this.checkoutFullSum = 0;
        for(let product of this.productsInCart){
            this.checkoutFullSum += product.sum;
        }
        this.checkoutFullSumElement.textContent = this.checkoutFullSum;
    }

    removeProduct(id){
        for (let product of this.productsInCart) {
            if (product.id === id) {
                document.querySelector( `#checkout-item${product.id}`).remove();
                this.productsInCart = this.productsInCart.filter(product => product.id !== id);
            }
            if(this.productsInCart.length === 0){
                this.toggleCheckoutVisibility();
                this.checkoutElement.remove();
                this.checkoutCreated = false;
                this.cartElement.classList.remove('shopping-cart--not-empty', );
            }
        }

        this.updateCounter();
        this.updateFullSum();
    }
}