import {BackDrop} from './components/back-drop.js';
import {ProductList} from './components/product-list.js';
import {ShoppingCart} from './components/shopping-cart.js';

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

export class App {
    constructor() {}

    static render(){
        this.shoppingCart = new ShoppingCart();
        this.backDrop = new BackDrop();
        this.productList = new ProductList(productArr, '.product-list__wrapper .col');
        this.productList.render();
    }

    static addToCart(productObject, quantity){
        this.shoppingCart.addToCat(productObject, quantity);
    }


    static toggleModals(){
        this.backDrop.toggleModals();
    }
}

App.render();