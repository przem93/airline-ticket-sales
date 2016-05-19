import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Index from './modules/Index';
import Login from './modules/Login';
import ErrorNoMatch from './modules/ErrorNoMatch';
import Application from './modules/Application';
import Registration from './modules/Registration';

export default class Routing extends React.Component {
    render() {
        return <Router history={browserHistory}>
            <Route path="/" component={Application}>
                <IndexRoute component={Index}/>
                <Route path="login" component={Login}/>
                <Route path="registration" component={Registration}/>
                <Route path="*" component={ErrorNoMatch}/>
            </Route>
        </Router>;
    }
}