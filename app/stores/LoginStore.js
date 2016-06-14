import alt from  '../alt';
import LoginActions from '../actions/LoginActions';
import { browserHistory } from 'react-router';

class LoginStore {
    constructor() {
        this.login = "";
        this.name = "";
        this.emial = "";
        this.userId = -1;
        this.owner = localStorage.owner ? true : sessionStorage.owner ? true : false;

        this.logged = localStorage.authorizationToken ? true : sessionStorage.authorizationToken ? true : false;

        this.bindListeners({
            onLogIn: LoginActions.logInDispatcher,
            onLogOut: LoginActions.logOut,
            getUserData: LoginActions.getUserDataDispatcher,
            getOwnerData: LoginActions.getOwnerDataDispatcher,
            updateField: LoginActions.updateField
        });
    }

    updateField(data) {
        this[data.property] = data.value;
    }
    
    getUserData(data) {
        this.name = data.name;
        this.surname = data.surname;
        this.email = data.email;
        this.login = data.login;
    }

    getOwnerData(data) {
        this.name = data.name;
        this.email = data.email;
        this.login = data.login;
    }

    onLogIn(data) {
        this.login = data.login;
        
        if(data.rememberLogin) {
            localStorage.setItem('authorizationToken', data.login);
            localStorage.setItem('owner', data.owner);
            localStorage.setItem('userId', data.id);
        } else {
            sessionStorage.setItem('authorizationToken', data.login);
            sessionStorage.setItem('owner', data.owner);
            sessionStorage.setItem('userId', data.id);
        }

        this.logged = true;
        this.userId = data.id;
        this.owner = data.owner;

        browserHistory.push('/your-account');
        Materialize.toast('Logowanie przebiegło poprawnie!', 4000);
    }

    onLogOut() {
        localStorage.removeItem('authorizationToken');
        sessionStorage.removeItem('authorizationToken');
        sessionStorage.removeItem('userId');
        localStorage.removeItem('owner');
        sessionStorage.removeItem('owner');
        this.logged = false;
        this.userId = -1;
        this.owner = false;
        browserHistory.push('/login');
        Materialize.toast('Zostałeś wylogowany!', 4000);
    }
}

export default alt.createStore(LoginStore, 'LoginStore');