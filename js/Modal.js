export default class Modal {
    constructor(modalId, contentClassName) {
        if (!Modal.instance) {
            if (!document.getElementById(modalId)) {
                throw new Error(
                    `Can not find html-element with id: ${modalId}`
                );
            }
            if (!document.getElementsByClassName(contentClassName)[0]) {
                throw new Error(
                    `Can not find html-element with class name: ${contentClassName}`
                );
            }
            this.element = document.getElementById(modalId);
            this.modalContent = null;
            this.form = document.getElementsByClassName(contentClassName)[0];
            Modal.instance = this;
        }

        return Modal.instance;
    }

    showModal(id) {
        this.modalContent = document.getElementById(id);
        this.modalContent.style.display = 'block';
        this.element.style.display = 'block';
        this.addListenerForCross();
        this.addListenerForOverlay();
    }

    closeModal() {
        this.element.style.display = 'none';
        this.modalContent.style.display = 'none';
    }

    addListenerForCross() {
        document.getElementById('closeCross').addEventListener('click', (e) => {
            e.preventDefault();
            this.closeModal();
        });
    }
    addListenerForOverlay() {
        document.getElementById('modal1').addEventListener('click', (e) => {
            if (e.target !== e.currentTarget) {
                return;
            }
            e.preventDefault();
            this.closeModal();
        });
    }
}
