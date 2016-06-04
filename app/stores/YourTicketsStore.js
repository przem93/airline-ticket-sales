import alt from  '../alt';
import YourTicketsActions from '../actions/YourTicketsActions';
import { browserHistory } from 'react-router';

class YourTicketsStore {
    constructor() {
        this.tickets = [];

        this.bindListeners({
            onGetTickets: YourTicketsActions.getTickets
        });
    }

    onGetTickets(data) {
        this.tickets = data;
    }
}

export default alt.createStore(YourTicketsStore, 'YourTicketsStore');