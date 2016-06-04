import alt from  '../alt';
import LoginActions from '../actions/LoginActions';
import { browserHistory } from 'react-router';

class LoginStore {
    constructor() {
        this.login = "";

        this.logged = localStorage.authorizationToken ? true : false;

        this.bindListeners({
            onLogIn: LoginActions.logIn,
            onLogOut: LoginActions.logOut
        });
    }

    onLogIn(data) {
        this.login = data.login;
        
        if(data.rememberLogin) {
            localStorage.setItem('authorizationToken', data.login);
        } else {
            sessionStorage.setItem('authorizationToken', data.login);
        }

        this.logged = true;

        browserHistory.push('/your-account');
        Materialize.toast('Logowanie przebiegło poprawnie!', 4000);
    }

    onLogOut() {
        localStorage.removeItem('authorizationToken');
        sessionStorage.removeItem('authorizationToken');
        this.logged = false;
        browserHistory.push('/login');
        Materialize.toast('Zostałeś wylogowany!', 4000);
    }
}

export default alt.createStore(LoginStore, 'LoginStore');