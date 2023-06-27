class ShoppingCart {
    constructor() {
        this.productsInCart = [];
        this.price = 0;
    }

    addToCat(id, price){
        this.productsInCart.push(id);
        this.price += +price;
        console.log(this.productsInCart, this.price)
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
    constructor(obj) {
        this.id = obj.id;
        this.title = obj.title;
        this.price = obj.price;
        this.imageUrl = obj.imageUrl;
    }

    render(hookElement){
        const productElement = document.createElement('div');
        productElement.id = this.id;
        productElement.className = 'product';
        productElement.innerHTML = `
        <h2 class="product__title">${this.title}</h2>
            <img class="product__image" src="${this.imageUrl}" alt="${this.title}">
        <p class="product__price">${this.price}$</p>
        `;

        const productElementButton = document.createElement('button');
        productElementButton.className = 'product__button';
        productElementButton.innerText = 'Add to cart';
        productElementButton.addEventListener('click', this.addToCart.bind(this));

        productElement.appendChild(productElementButton);
        hookElement.appendChild(productElement);
    }

    addToCart(){
        App.addToCart(this.id, this.price)
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
        this.productList = new ProductList(productArr, '.product-list__wrapper .col');
        this.productList.render();
    }

    static addToCart(id, price){
        this.shoppingCart.addToCat(id, price);
    }
}

App.render();