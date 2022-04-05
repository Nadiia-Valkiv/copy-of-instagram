import { app } from './main.js';
import { clearList } from './function.js';

export default class EditForm {
    constructor(email) {
        this.userToEdit = email;
        this.editUserData = undefined;
        this.editFormWrapper =
            document.getElementsByClassName('edit-form-wrapper')[0];
        this.editForm = document.getElementsByClassName('edit-form')[0];
        app.closeListOfUsers();
        this.showEditForm();
        this.editForm.addEventListener('submit', (e) =>
            this.handleFormSubmit(e)
        );
    }

    showEditForm() {
        this.editFormWrapper.style.display = 'block';
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const formJSON = Object.fromEntries(data.entries());
        formJSON.hobby = data.getAll('hobby');
        let oldUserData = app.usersDataLayer.get(this.userToEdit, 'Users');
        let allUserData = { ...oldUserData, ...formJSON };
        this.editUserData = app.usersDataLayer.getAll('Users');
        this.editUserData[this.userToEdit] = allUserData;
        app.usersDataLayer.updateAfterRemove(this.editUserData, 'Users');
        this.editFormWrapper.style.display = 'none';
        clearList();
        app.listOfUsers.createListOfUsers();
        document.getElementsByClassName('list-of-users')[0].style.display =
            'block';
    }
}
