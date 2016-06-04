import React from 'react';
import AltContainer from 'alt-container';

import ApplicationView from './ApplicationView';

import LoginActions from '../../actions/LoginActions';
import LoginStore from '../../stores/LoginStore';

export default class Login extends React.Component {
    logoutAction() {
        LoginActions.logOut();
    }

    render() {
        return <AltContainer store={LoginStore}>
            <ApplicationView {...this.props} logoutAction={this.logoutAction}/>
        </AltContainer>;
    }
}