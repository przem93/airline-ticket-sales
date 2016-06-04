import alt from  '../alt';
import SearchActions from '../actions/SearchActions';

class SearchStore {
    constructor() {
        this.flight = [{
            city: "Kijów",
            longitude: 30.4990213,
            latitude: 50.4491605
        }, {
            city: "Warszawa",
            longitude: 20.9211111,
            latitude: 52.2330653
        }, {
            city: "Berlin",
            longitude: 13.14495689,
            latitude: 52.50762
        }, {
            city: "Oslo",
            longitude: 10.7373893,
            latitude: 59.905446
        }];

        this.connections = [[
            {
                name: "Lot",
                duration: 2,
                seats: 300,
                price: 200.42,
                dayOfWeek: 0,
                monthOfYear: 0,
                hour: 12
            },
            {
                name: "Airlines",
                duration: 3,
                seats: 100,
                price: 150.42,
                dayOfWeek: 0,
                monthOfYear: 0,
                hour: 14
            }
        ],[
            {
                name: "Emirates",
                duration: 3,
                seats: 300,
                price: 200.42,
                dayOfWeek: 0,
                monthOfYear: 0,
                hour: 12
            }
        ],[
            {
                name: "Emirates",
                duration: 3,
                seats: 300,
                price: 200.42,
                dayOfWeek: 0,
                monthOfYear: 0,
                hour: 12
            },
            {
                name: "Lot",
                duration: 1,
                seats: 100,
                price: 450.42,
                dayOfWeek: 0,
                monthOfYear: 0,
                hour: 14
            }
        ]];

        this.first = false;

        this.bindListeners({
            onSearch: SearchActions.search
        });
    }

    onSearch() {
        if (this.first) {
            this.flight = [{
                city: "Kijów",
                longitude: 30.4990213,
                latitude: 50.4491605
            }, {
                city: "Warszawa",
                longitude: 20.9211111,
                latitude: 52.2330653
            }, {
                city: "Berlin",
                longitude: 13.14495689,
                latitude: 52.50762
            }, {
                city: "Oslo",
                longitude: 10.7373893,
                latitude: 59.905446
            }];
            this.first = false;
        } else {
            this.flight = [{
                city: "Kijów",
                longitude: 30.4990213,
                latitude: 50.4491605
            }, {
                city: "Warszawa",
                longitude: 20.9211111,
                latitude: 52.2330653
            }, {
                city: "Berlin",
                longitude: 13.14495689,
                latitude: 52.50762
            }, {
                city: "Londyn",
                longitude: -0.2416817,
                latitude: 51.5287718
            }];
            this.first = true;
        }
    }
}

export default alt.createStore(SearchStore, 'SearchStore');