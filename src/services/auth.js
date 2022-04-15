import { Auth } from 'aws-amplify';

async function signUp(userObj, successCallback = () => {}, errorCallback = () => {}) {
    try { 
        const { user } = await Auth.signUp({
            username: userObj.email,
            password: userObj.password,
            attributes: {
                email: userObj.email
            }
        });
        successCallback(user);
    } catch (error) {
        errorCallback(error);
    }
}

async function login(userObj, successCallback = () => {}, errorCallback = () => {}) {
    try {
        const user = await Auth.signIn(userObj.email, userObj.password);
        successCallback(user);
    } catch (error) {
        errorCallback(error);
    }
}

async function resendConfirmation(email, successCallback = () => {}, errorCallback = () => {}) {
    try {
        const user = await Auth.resendSignUp(email);
        successCallback(user);
    } catch (error) {
        console.log(error)
        errorCallback(error);
    }
}

async function confirmSignup(email, confirmationCode, successCallback = () => {}, errorCallback = () => {}) {
    try {
        const user = await Auth.confirmSignUp(email, confirmationCode);
        successCallback(user);
    } catch (error) {
        errorCallback(error);
    }
}

async function signOut(successCallback = () => {}, errorCallback = () => {}) {
    try {
        await Auth.signOut();
        successCallback();
    } catch (error) {
        errorCallback(error);
    }
}

export {
    signUp,
    login,
    resendConfirmation,
    confirmSignup,
    signOut
}