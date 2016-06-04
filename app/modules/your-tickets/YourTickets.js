import React from 'react';
import AltContainer from 'alt-container';

import YourTicketsView from './YourTicketsView';

import YourTicketsActions from '../../actions/YourTicketsActions';
import YourTicketsStore from '../../stores/YourTicketsStore';

export default class YourTickets extends React.Component {
    componentDidMount() {
        YourTicketsActions.getTickets();
    }
    
    render() {
        return <AltContainer store={YourTicketsStore}>
            <YourTicketsView />
        </AltContainer>;
    }
}