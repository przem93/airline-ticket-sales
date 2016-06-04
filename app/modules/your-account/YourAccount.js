import React from 'react';
import AltContainer from 'alt-container';

import YourAccountView from './YourAccountView';

import LoginActions from '../../actions/LoginActions';
import LoginStore from '../../stores/LoginStore';

export default class YourAccount extends React.Component {
    render() {
        return <AltContainer store={LoginStore}>
            <YourAccountView />
        </AltContainer>;
    }
}