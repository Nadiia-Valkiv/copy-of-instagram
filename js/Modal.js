export default class Modal {
    element = document.getElementById('modal1');
    modalContent = null;
    form = document.getElementsByClassName('test-modal-content')[0]
    constructor() {
        if (!Modal.instance) {
            Modal.instance = this;
        }
        return Modal.instance;
    }

    static getInstance() {
        return this.instance;
    }

    showModal(id) {
        this.modalContent = document.getElementById(id)
        this.modalContent.style.display = 'block'
        this.element.style.display = 'block';
        this.addListener()
    }

    closeModal() {
        this.element.style.display = 'none';
        this.modalContent.style.display = 'none'
    }
    
    addListener(){
        document.getElementById('closeCross').addEventListener('click', (e) => {
           e.preventDefault();
           this.closeModal();
        })
    }
}


