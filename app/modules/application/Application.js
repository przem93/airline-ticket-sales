import React from 'react';
import AltContainer from 'alt-container';

import ApplicationView from './ApplicationView';

import LoginActions from '../../actions/LoginActions';
import LoginStore from '../../stores/LoginStore';
import SearchStore from '../../stores/SearchStore';

export default class Login extends React.Component {
    logoutAction() {
        LoginActions.logOut();
    }

    render() {
        return <AltContainer stores={{LoginStore: LoginStore, SearchStore: SearchStore}}>
            <ApplicationView {...this.props} logoutAction={this.logoutAction}/>
        </AltContainer>;
    }
}