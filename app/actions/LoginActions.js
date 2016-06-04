import alt from  '../alt';

class LoginActions {
    constructor() {
        
    }

    logIn(login, password, rememberLogin) {
        return {
            login: login,
            rememberLogin: rememberLogin
        };
    }

    logOut() {
        return '';
    }
}

export default alt.createActions(LoginActions);
