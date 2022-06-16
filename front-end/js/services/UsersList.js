import EditForm from '../forms/EditForm.js';
import { app } from '../main.js';
import { clearList } from '../utils/helpers.js';

export default class UsersList {
    constructor() {
        clearList('list-wrapper');
        this.list = document.getElementsByClassName('list-wrapper')[0];
        this.userToRemove = '';
        this.userToRemoveId = '';
        this.form = null;
        this.confirmDeleteUser();
        this.cancelButtonListener();
    }

    createListItem(email, id) {
        const item = document.createElement('li');
        this.createButtonWrapper();
        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('list-item-wrapper');
        item.classList.add('list-item');
        const usersEmail = document.createElement('span');
        usersEmail.classList.add('email-item');
        usersEmail.innerHTML = email;
        itemWrapper.appendChild(usersEmail);
        itemWrapper.appendChild(this.createButtonWrapper(id));
        item.appendChild(itemWrapper);
        this.list.appendChild(item);
    }

    createButton(type, id, buttonWrapper) {
        const button = document.createElement('button');
        button.classList.add('list-button');
        button.setAttribute('id', `${type}-` + id);
        button.innerText = type;
        buttonWrapper.appendChild(button);
    }

    createButtonWrapper(id) {
        const div = document.createElement('div');
        div.classList.add('list-button-wrapper');
        this.createButton('delete', id, div);
        this.createButton('edit', id, div);
        return div;
    }

    createListOfUsers() {
        return app.usersDataLayer
            .getAll()
            .then((users) => {
                users
                    .map((user) => user.username)
                    .forEach((el) => {
                        this.createListItem(el, el);
                        document
                            .getElementById(`delete-${el}`)
                            .addEventListener('click', (e) =>
                                this.showDeleteDialog(e)
                            );

                        document
                            .getElementById(`edit-${el}`)
                            .addEventListener('click', () => {
                                app.editForm = new EditForm(el);
                                app.editForm.showEditForm('editForm');
                            });
                    });
            })
            .catch((err) => {
                throw new Error(err);
            });
    }

    showListOfUsers() {
        document.getElementsByClassName('list-of-users')[0].style.display =
            'block';
        return this.createListOfUsers();
    }

    showDeleteDialog(e) {
        this.userToRemoveId = e.path[0].id;
        this.userToRemove = this.userToRemoveId.split('-')[1];
        app.modal.showModal('deleteMessage');
    }

    confirmDeleteUser() {
        document
            .getElementById('confirm')
            .addEventListener('click', () => this.deleteUserFromStorage());
    }

    deleteUserFromStorage() {
        app.usersDataLayer.delete(this.userToRemove).then(() => {
            clearList('list-wrapper');
            this.createListOfUsers();
            app.modal.closeModal();
        });
    }

    cancelDeleteUser() {
        app.modal.closeModal();
    }

    cancelButtonListener() {
        document
            .getElementById('cancel')
            .addEventListener('click', () => this.cancelDeleteUser());
    }
}
