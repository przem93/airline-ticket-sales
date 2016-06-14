import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import Index from './modules/index/Index';
import Login from './modules/login/Login';
import ErrorNoMatch from './modules/ErrorNoMatch';
import Application from './modules/application/Application';
import Registration from './modules/registration/Registration';
import YourAccount from './modules/your-account/YourAccount';
import YourTickets from './modules/your-tickets/YourTickets';
import YourFlights from './modules/your-flights/YourFlights';
import AddFlight from './modules/add-flight/AddFlight';
import EditFlight from './modules/edit-flight/EditFlight';

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

function checkIfAuthExistAndUser(nextState, replaceState) {
    if ((localStorage.authorizationToken || sessionStorage.authorizationToken) && (localStorage.owner === "true"|| sessionStorage.owner === "true")) {
        replaceState('/your-account');
        Materialize.toast('Nie jesteś użytkownikiem!', 4000);
    }
}

function checkIfAuthExistAndOwner(nextState, replaceState) {
    if ((localStorage.authorizationToken || sessionStorage.authorizationToken) && (localStorage.owner !== "true" && sessionStorage.owner !== "true")) {
        replaceState('/your-account');
        Materialize.toast('Nie jesteś właścicielem linii lotniczych!', 4000);
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
                <Route path="your-tickets" component={YourTickets} onEnter={checkIfAuthExistAndUser}/>
                <Route path="your-flights" component={YourFlights} onEnter={checkIfAuthExistAndOwner}/>
                <Route path="add-flight" component={AddFlight} onEnter={checkIfAuthExistAndOwner}/>
                <Route path="edit-flight/:id" component={EditFlight} onEnter={checkIfAuthExistAndOwner}/>
                <Route path="*" component={ErrorNoMatch}/>
            </Route>
        </Router>;
    }
}