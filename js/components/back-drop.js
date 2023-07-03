export class BackDrop {
    constructor(){
        this.backDropElement = document.createElement('div');
        this.backDropElement.className = 'back-drop';
        this.backDropElement.addEventListener('click', this.toggleModals.bind(this) );
        document.querySelector('body').appendChild(this.backDropElement);
    }


    toggleModals(){
        document.querySelector('.checkout').classList.toggle('checkout--active');
        this.backDropElement.classList.toggle('back-drop--active');
    }
}