import alt from  '../alt';
import SearchActions from '../actions/SearchActions';
import _ from 'lodash';

class SearchStore {
    constructor() {
        this.airportsFrom = [];
        this.airportsTo = [];

        this.flight = [];
        this.connections = [];
        this.searched = false;

        this.loading = false;

        this.bindListeners({
            onSearch: SearchActions.searchDispatcher,
            onSearchAirports: SearchActions.searchAirportsToDispatcher,
            onSetLoading: SearchActions.setLoading
        });
    }

    onSetLoading(value) {
        this.loading = value;
    }

    onSearchAirports(data) {
        this[data.property] = _.map(data.value, (airport) => {
            let label = `${airport.name}, ${airport.city}, ${airport.country}`;
            let labelForDropDown = label;
            labelForDropDown = labelForDropDown.replace(data.searchValue, `<span style="font-weight: 900; color: #000;">${data.searchValue}</span>`);

            return {
                value: airport.rid,
                label: label,
                labelForDropDown: `<span style="color: #999;">${labelForDropDown}</span>`
            }
        });
    }

    onSearch(data) {
        this.flight = _.map(data.airports, airport => {
            airport[0].longitude = parseFloat(airport[0].longitude);
            airport[0].latitude = parseFloat(airport[0].latitude);

            return airport[0];
        });

        this.connections = _.map(data.connections, connection => {
            return _.map(connection, con => {
                let c = con[0];
                c.price = parseFloat(c.price);

                return c;
            });
        });

        this.searched = true;
        this.loading = false;
    }
}

export default alt.createStore(SearchStore, 'SearchStore');