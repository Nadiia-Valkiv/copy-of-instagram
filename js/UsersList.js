import EditForm from './EditForm.js';
import { app } from './main.js';
import { clearList } from './helpers.js';

export default class UsersList {
    constructor() {
        clearList('list-wrapper');
        this.list = document.getElementsByClassName('list-wrapper')[0];
        this.allUsers = app.usersDataLayer.getAll('Users');
        this.userToRemove = '';
        this.userToRemoveId = '';
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
        const allUsersKeys = Object.keys(this.allUsers);
        allUsersKeys.forEach((el, index) => {
            this.createListItem(el, el);
            document
                .getElementById(`delete-${allUsersKeys[index]}`)
                .addEventListener('click', (e) => this.showDeleteDialog(e));

            document
                .getElementById(`edit-${allUsersKeys[index]}`)
                .addEventListener('click', () => {new EditForm(allUsersKeys[index]);
                });
        });
    }

    showListOfUsers() {
        document.getElementsByClassName('list-of-users')[0].style.display =
            'block';
        this.createListOfUsers();
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
        delete this.allUsers[this.userToRemove];
        app.usersDataLayer.updateAfterRemove(
            this.allUsers,
            app.usersDataLayer.tableName
        );
        clearList('list-wrapper');
        this.createListOfUsers();
        app.modal.closeModal();
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
