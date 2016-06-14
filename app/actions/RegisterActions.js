import alt from  '../alt';

class RegisterActions {
    constructor() {

    }

    register(login, password, repeatPassword, email, name, surname) {
        this.registerSchema({
            name: name,
            surname: surname,
            login: login,
            pass: password,
            email: email
        }, repeatPassword, 'register');
    }

    registerOwner(login, password, repeatPassword, email, name) {
        this.registerSchema({
            name: name,
            login: login,
            password: password,
            email: email
        }, repeatPassword, 'registerOwner');
    }

    registerSchema(body, repeatPassword, url) {
        if(body.pass !== repeatPassword) {
            Materialize.toast('Hasła muszą być takie same!', 4000);
            return false;
        }

        $.ajax({
            type: 'POST',
            url: `http://188.213.173.106:8080/webapp/${url}`,
            contentType: 'application/json',
            data: JSON.stringify(body),
            xhrFields: {
                withCredentials: false
            },
            success: (data, a, response) => {
                if(response.status === 201) {
                    Materialize.toast('Zostałeś zarejestrowany!', 4000);
                    browserHistory.push('/login');
                } else if(response.status === 208) {
                    Materialize.toast('Użytkownik o danym loginie już istnieje!', 4000);
                }
            },
            error: (err) => {
                Materialize.toast('Błąd podczas rejestracji!', 4000);
            }
        });
    }
}

export default alt.createActions(RegisterActions);
