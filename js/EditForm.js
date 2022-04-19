import { app } from './main.js';
import { clearList, hideHTMLElementByClassName } from './helpers.js';
import { editFormInputs } from './constants.js';

export default class EditForm {
    constructor(email) {
        this.userToEdit = email;
        this.editUserData = undefined;
        this.editFormWrapper =
            document.getElementsByClassName('edit-form-wrapper')[0];
        this.editForm = document.getElementsByClassName('edit-form')[0];
        hideHTMLElementByClassName('list-of-users');
        this.editForm.addEventListener('submit', (e) =>
            this.handleFormSubmit(e)
        );
        this.addUserEmailToHeading();
        this.populateEditForm();
        this.showEditForm();
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
        clearList('list-wrapper');
        app.listOfUsers.createListOfUsers();
        document.getElementsByClassName('list-of-users')[0].style.display =
            'block';
        this.editForm.reset();
    }

    populateEditForm() {
        const user = app.usersDataLayer.get(this.userToEdit);
        const gender = user.gender;
        const hobby = user.hobby;
        const country = user.country;
        for (let input of editFormInputs) {
            if (!!user[input]) {
                document
                    .getElementById(input)
                    .setAttribute('value', user[input]);
            }
        }
        if (!!gender) {
            document.getElementById(`gender-${gender}`).checked = true;
        }
        if (!!hobby) {
            for (let h of hobby) {
                document.getElementById(h.toLowerCase()).checked = true;
            }
        }
        if (!!country) {
            document.getElementById(country).setAttribute('selected', true);
        }
    }

    addUserEmailToHeading() {
        document.getElementById(
            'editFormEmail'
        ).innerHTML = `${this.userToEdit}`;
    }
}
