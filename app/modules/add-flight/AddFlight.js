import React from 'react';
import AltContainer from 'alt-container';

import AddFlightView from './AddFlightView';

import YourFlightsActions from '../../actions/YourFlightsActions';
import YourFlightsStore from '../../stores/YourFlightsStore';
import SearchActions from '../../actions/SearchActions';
import SearchStore from '../../stores/SearchStore';

export default class AddFlight extends React.Component {
    searchAirports(property, value) {
        SearchActions.searchAirports(property, value);
    }

    addFlight(from, to, month, day, hour, seats, duration, price) {
        YourFlightsActions.addFlight(from, to, month, day, hour, seats, duration, price);
    }
    
    render() {
        return <AltContainer stores={{SearchStore: SearchStore, YourFlightsStore: YourFlightsStore}}>
            <AddFlightView searchAirports={::this.searchAirports}
                           addFlight={::this.addFlight}/>
        </AltContainer>;
    }
}