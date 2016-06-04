import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import Index from './modules/index/Index';
import Login from './modules/login/Login';
import ErrorNoMatch from './modules/ErrorNoMatch';
import Application from './modules/application/Application';
import Registration from './modules/Registration';
import YourAccount from './modules/your-account/YourAccount';
import YourTickets from './modules/your-tickets/YourTickets';

function checkIfAuthExist(nextState, replaceState) {
    if (!localStorage.authorizationToken && !sessionStorage.authorizationToken) {
        replaceState('/login');
        Materialize.toast('Musisz się zalogować!', 4000);
    }
}

function checkIfAuthNotExist(nextState, replaceState) {
    if (localStorage.authorizationToken || sessionStorage.authorizationToken) {
        replaceState('/your-account');
        Materialize.toast('Jesteś już zalogowany!', 4000);
    }
}

export default class Routing extends React.Component {
    render() {
        return <Router history={browserHistory}>
            <Route path="/" component={Application}>
                <IndexRoute component={Index}/>
                <Route path="login" component={Login} onEnter={checkIfAuthNotExist}/>
                <Route path="registration" component={Registration} onEnter={checkIfAuthNotExist}/>
                <Route path="your-account" component={YourAccount} onEnter={checkIfAuthExist}/>
                <Route path="your-tickets" component={YourTickets} onEnter={checkIfAuthExist}/>
                <Route path="*" component={ErrorNoMatch}/>
            </Route>
        </Router>;
    }
}