import React from 'react';
import AltContainer from 'alt-container';

import YourFlightsView from './YourFlightsView';

import YourFlightsActions from '../../actions/YourFlightsActions';
import SearchActions from '../../actions/SearchActions';
import YourFlightsStore from '../../stores/YourFlightsStore';
import SearchStore from '../../stores/SearchStore';

export default class YourFlights extends React.Component {
    componentDidMount() {
        let id = localStorage.userId ? localStorage.userId : sessionStorage.userId;
        
        SearchActions.setLoading(true);
        YourFlightsActions.getFlights(id, SearchActions.setLoading.bind(this, false));
    }

    render() {
        return <AltContainer store={YourFlightsStore}>
            <YourFlightsView />
        </AltContainer>;
    }
}