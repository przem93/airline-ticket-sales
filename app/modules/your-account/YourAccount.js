import React from 'react';
import AltContainer from 'alt-container';

import YourAccountView from './YourAccountView';

import LoginActions from '../../actions/LoginActions';
import LoginStore from '../../stores/LoginStore';

export default class YourAccount extends React.Component {
    componentDidMount() {
        if (localStorage.owner === "true" || sessionStorage.owner == "true") {
            LoginActions.getOwnerData();
        } else {
            LoginActions.getUserData();
        }
    }

    updateField(property, value) {
        LoginActions.updateField(property, value);
    }

    save(email, name, surname){
        if (localStorage.owner === "true" || sessionStorage.owner == "true") {
            LoginActions.updateOwnerData(email, name);
        } else {
            LoginActions.updateUserData(email, name, surname);
        }
    }
    
    render() {
        return <AltContainer store={LoginStore}>
            <YourAccountView updateField={::this.updateField}
                             save={::this.save}/>
        </AltContainer>;
    }
}