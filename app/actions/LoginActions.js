import alt from  '../alt';

class LoginActions {
    constructor() {

    }

    getOwnerData() {
        $.ajax({
            type: 'GET',
            url: `http://188.213.173.106:8080/webapp/getOwnerData?id=${localStorage.userId ? localStorage.userId : sessionStorage.userId}`,
            contentType: 'text/plain',
            xhrFields: {
                withCredentials: false
            },
            success: (data) => {
                this.getOwnerDataDispatcher(data);
            },
            error: (err) => {
                Materialize.toast('Błąd podczas pobierania informacji!', 4000);
            }
        });
    }

    getOwnerDataDispatcher(data) {
        return data;
    }

    getUserData() {
        $.ajax({
            type: 'GET',
            url: `http://188.213.173.106:8080/webapp/getUserData?id=${localStorage.userId ? localStorage.userId : sessionStorage.userId}`,
            contentType: 'text/plain',
            xhrFields: {
                withCredentials: false
            },
            success: (data) => {
                this.getUserDataDispatcher(data);
            },
            error: (err) => {
                Materialize.toast('Błąd podczas pobierania informacji!', 4000);
            }
        });
    }

    getUserDataDispatcher(data) {
        return data;
    }

    logInOwner(login, password, rememberLogin) {
        this.logInAjax(login, password, rememberLogin, 'logingOwner', true);
    }

    logIn(login, password, rememberLogin) {
        this.logInAjax(login, password, rememberLogin, 'loging', false);
    }

    logInAjax(login, password, rememberLogin, action, owner) {
        $.ajax({
            type: 'GET',
            url: `http://188.213.173.106:8080/webapp/${action}?login=${login}&pass=${password}`,
            contentType: 'text/plain',
            xhrFields: {
                withCredentials: false
            },
            success: (data) => {
                this.logInDispatcher(parseInt(JSON.parse(data).clientid), login, rememberLogin, owner);
            },
            error: (err) => {
                Materialize.toast('Zły login lub hasło!', 4000);
            }
        });
    }

    logInDispatcher(id, login, rememberLogin, owner) {
        return {
            id: id,
            login: login,
            rememberLogin: rememberLogin,
            owner: owner
        };
    }

    logOut() {
        return '';
    }

    updateField(property, value) {
        return {
            property: property,
            value: value
        };
    }

    updateOwnerData(email, name) {
        $.ajax({
            type: 'POST',
            url: `http://188.213.173.106:8080/webapp/updateOwnerData`,
            contentType: 'application/json',
            data: JSON.stringify({
                email: email,
                name: name,
                id: localStorage.userId ? localStorage.userId : sessionStorage.userId
            }),
            xhrFields: {
                withCredentials: false
            },
            success: (data, a, response) => {
                Materialize.toast('Zapisano!', 4000);
            },
            error: (err) => {
                Materialize.toast('Bład podczas zapisu!', 4000);
            }
        });
    }

    updateUserData(email, name, surname) {
        $.ajax({
            type: 'POST',
            url: `http://188.213.173.106:8080/webapp/updateUserData`,
            contentType: 'application/json',
            data: JSON.stringify({
                email: email,
                name: name,
                surname: surname,
                id: localStorage.userId ? localStorage.userId : sessionStorage.userId
            }),
            xhrFields: {
                withCredentials: false
            },
            success: (data, a, response) => {
                Materialize.toast('Zapisano!', 4000);
            },
            error: (err) => {
                Materialize.toast('Bład podczas zapisu!', 4000);
            }
        });
    }

}

export default alt.createActions(LoginActions);
