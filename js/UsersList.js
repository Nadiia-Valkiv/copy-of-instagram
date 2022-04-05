import EditForm from './EditForm.js';
import { app } from './main.js';
import { clearList } from './function.js';

export default class UsersList {
    constructor() {
        this.list = document.getElementsByClassName('list-wrapper')[0];
        this.allUsers = app.usersDataLayer.getAll('Users');
        this.overlayme = document.getElementById('dialog-container');
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
        console.log('test');
        const allUsersKeys = Object.keys(this.allUsers);
        allUsersKeys.forEach((el, index) => {
            this.createListItem(el, el);
            document
                .getElementById(`delete-${allUsersKeys[index]}`)
                .addEventListener('click', (e) => this.showDeleteDialog(e));
            document.getElementById(`edit-${allUsersKeys[index]}`).onclick =
                () => new EditForm(allUsersKeys[index]);
        });
    }

    showListOfUsers() {
        document.getElementsByClassName('list-of-users')[0].style.display =
            'block';
        this.createListOfUsers();
        console.log('here');
    }

    showDeleteDialog(e) {
        this.userToRemoveId = e.path[0].id;
        this.userToRemove = this.userToRemoveId.split('-')[1];
        this.overlayme.style.display = 'block';
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
        clearList();
        this.createListOfUsers();
        this.overlayme.style.display = 'none';
    }

    cancelDeleteUser() {
        this.overlayme.style.display = 'none';
    }

    cancelButtonListener() {
        document
            .getElementById('cancel')
            .addEventListener('click', () => this.cancelDeleteUser());
    }
}
