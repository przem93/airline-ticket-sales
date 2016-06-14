import React from 'react';
import AltContainer from 'alt-container';
import RegistrationView from './RegistrationView';
import RegisterActions from '../../actions/RegisterActions';

export default class Registration extends React.Component {
    register(login, password, repeatPassword, email, name, surname) {
        RegisterActions.register(login, password, repeatPassword, email, name, surname);
    }
    
    registerOwner(login, password, repeatPassword, email, name) {
        RegisterActions.registerOwner(login, password, repeatPassword, email, name);
    }
    
    render() {
        return <AltContainer>
            <RegistrationView register={::this.register}
                              registerOwner={::this.registerOwner}/>
        </AltContainer>;
    }
}