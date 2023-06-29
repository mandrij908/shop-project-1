class BackDrop {
    constructor(){
        this.backDropElement = document.createElement('div');
        this.backDropElement.className = 'back-drop';
        document.querySelector('body').appendChild(this.backDropElement);
    }

    toggle(){
        this.backDropElement.classList.toggle('back-drop--active');
    }
}

class ShoppingCart {
    constructor() {
        this.productsInCart = [];
        this.sum = 0;
        this.cartElement = document.querySelector('.shopping-cart');
        this.productCounderElement = document.querySelector('.shopping-cart__counter');
        this.productIconElement = document.querySelector('.shopping-cart__icon');
        this.productCounderElement.addEventListener('click', this.toggleCheckoutVisibility.bind(this));
        this.productIconElement.addEventListener('click', this.toggleCheckoutVisibility.bind(this));
        this.checkoutCreated = false;
    }

    addToCat(productObject){
        this.productsInCart.push(productObject);
        this.updateCounter();
        this.createCheckout();
        this.updateCheckout();
    }

    updateCounter(){
        this.productCounderElement.textContent = this.productsInCart.length.toString();
    }

    createCheckout(){
        if(this.checkoutCreated){
            return;
        }

        this.cartElement.classList.add('shopping-cart--not-empty');
        this.checkoutElement = document.createElement('div');
        this.checkoutElement.className = 'checkout';
        this.checkoutListElement = document.createElement('ul');
        this.checkoutElement.appendChild(this.checkoutListElement);
        this.cartElement.appendChild(this.checkoutElement);

        this.checkoutCreated = true
    }

    updateCheckout(){
        this.checkoutListElement.innerHTML = '';

        for (let index in this.productsInCart){
            const checkoutListItem = document.createElement('li');
            checkoutListItem.innerHTML = `
                <img class="checkout__image" src="${this.productsInCart[index].imageUrl}" alt="${this.productsInCart[index].title}">
                <h2 class="checkout__title">${this.productsInCart[index].title}</h2>
                <p class="checkout__price">${this.productsInCart[index].price}</p>
                <p class="checkout__id">${this.productsInCart[index].id}</p>
                <input class="checkout__count" type="number" placeholder="1">
        `;
            this.checkoutListElement.appendChild(checkoutListItem);
        }
    }

    toggleCheckoutVisibility(){
        if(!this.checkoutCreated){
            return;
        }
        this.checkoutElement.classList.toggle('checkout__active');
        App.toggleBackDrop();
    }
}

class ProductList {
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

class ProductItem {
    constructor(productObject) {
        this.productObject = productObject;
    }

    render(hookElement){
        const productElement = document.createElement('div');
        productElement.id = this.productObject.id;
        productElement.className = 'product';
        productElement.innerHTML = `
        <h2 class="product__title">${ this.productObject.title}</h2>
            <img class="product__image" src="${ this.productObject.imageUrl}" alt="${ this.productObject.title}">
        <p class="product__price">${ this.productObject.price}$</p>
        `;

        const productElementButton = document.createElement('button');
        productElementButton.className = 'product__button';
        productElementButton.innerText = 'Add to cart';
        productElementButton.addEventListener('click', this.addToCart.bind(this));

        productElement.appendChild(productElementButton);
        hookElement.appendChild(productElement);
    }

    addToCart(){
        App.addToCart(this.productObject)
    }
}

const productArr = [
    {
        id: 'id-1',
        title: 'Product 1',
        price: '20',
        imageUrl: 'https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202312/0693/belgian-linen-pillow-c.jpg',
    },
    {
        id: 'id-2',
        title: 'Product 2',
        price: '10',
        imageUrl: 'https://m.media-amazon.com/images/I/71oZ8Gt9lbL._AC_UF894,1000_QL80_.jpg',
    },
];

class App {
    constructor() {}

    static render(){
        this.shoppingCart = new ShoppingCart();
        this.backDrop = new BackDrop();
        this.productList = new ProductList(productArr, '.product-list__wrapper .col');
        this.productList.render();
    }

    static addToCart(productObject){
        this.shoppingCart.addToCat(productObject);
    }

    static toggleBackDrop(){
        this.backDrop.toggle()
    }
}

App.render();