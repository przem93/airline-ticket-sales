import React from 'react';
import AltContainer from 'alt-container';

import LoginView from './LoginView';

import LoginActions from '../../actions/LoginActions';
import LoginStore from '../../stores/LoginStore';

export default class Login extends React.Component {
    loginAction(login, password, rememberLogin) {
        LoginActions.logIn(login, password, rememberLogin);
    }

    render() {
        return <AltContainer store={LoginStore}>
            <LoginView loginAction={this.loginAction}/>
        </AltContainer>;
    }
}