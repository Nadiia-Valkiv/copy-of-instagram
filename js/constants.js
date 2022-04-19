const tableName = 'Users';
const click = 'click';

const signUpButtonId = 'submit';
const signUpEmailId = 'email';
const signUpPsw1Id = 'psw1';
const signUpPsw2Id = 'psw2';
const signUpSuccessfullyMessage = 'You successfully registered';
const signUpInvalidDataMessage = 'Your data is invalid. Please try again';
const signUpHaveAccountMessage = 'You already have an account. Please login';

const loginButtonId = 'login-submit';
const loginEmailId = 'login-email';
const loginPswId = 'login-psw';
const loginPleaseRegisterMessage = `You don't have an account. Please register`;

const loginSuccessfullyMessage = 'You successfully login';
const loginPasswordIncorrectMessage = 'Your password is invalid ';

const editFormInputs = [
    'name',
    'surname',
    'dateOfBirth',
];

export {
    tableName,
    click,
    signUpButtonId,
    signUpEmailId,
    signUpPsw1Id,
    signUpPsw2Id,
    signUpSuccessfullyMessage,
    signUpInvalidDataMessage,
    signUpHaveAccountMessage,
    loginButtonId,
    loginEmailId,
    loginPswId,
    loginPleaseRegisterMessage,
    loginSuccessfullyMessage,
    loginPasswordIncorrectMessage,
    editFormInputs,
};
