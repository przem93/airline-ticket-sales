import React from 'react';
import AltContainer from 'alt-container';

import EditFlightView from './EditFlightView';

import YourFlightsActions from '../../actions/YourFlightsActions';
import YourFlightsStore from '../../stores/YourFlightsStore';
import SearchActions from '../../actions/SearchActions';
import SearchStore from '../../stores/SearchStore';

export default class EditFlight extends React.Component {
    static contextTypes = {
        params: React.PropTypes.object
    }
    
    searchAirports(property, value) {
        SearchActions.searchAirports(property, value);
    }

    editFlight(from, to, month, day, hour, seats, duration, price) {
        YourFlightsActions.editFlight(from, to, month, day, hour, seats, duration, price);
    }
    
    getFlight(){
        YourFlightsActions.getFlight(this.context.params.id)
    }

    render() {
        return <AltContainer stores={{SearchStore: SearchStore, YourFlightsStore: YourFlightsStore}}>
            <EditFlightView searchAirports={::this.searchAirports}
                           editFlight={::this.editFlight}/>
        </AltContainer>;
    }
}