export default class Modal {
    constructor() {
        if (!Modal.instance) {
            this.element = document.getElementById('modal1');
            this.modalContent = null;
            this.form =
                document.getElementsByClassName('test-modal-content')[0];
            Modal.instance = this;
        }

        return Modal.instance;
    }

    showModal(id) {
        this.modalContent = document.getElementById(id);
        this.modalContent.style.display = 'block';
        this.element.style.display = 'block';
        this.addListener();
    }

    closeModal() {
        this.element.style.display = 'none';
        this.modalContent.style.display = 'none';
    }

    addListener() {
        document.getElementById('closeCross').addEventListener('click', (e) => {
            e.preventDefault();
            this.closeModal();
        });
    }
}
