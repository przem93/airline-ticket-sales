import {default as React, Component} from "react";
import AltContainer from 'alt-container';
import IndexView from './IndexView';
import SearchActions from '../../actions/SearchActions';
import SearchStore from '../../stores/SearchStore';

export default class Index extends Component {
    search(from, to) {
        SearchActions.search(from, to);
    }

    searchAirports(property, value) {
        SearchActions.searchAirports(property, value);
    }

    buyTicket(ticket) {
        SearchActions.buyTicket(ticket);
    }

    render() {
        return <AltContainer store={SearchStore}>
            <IndexView search={::this.search}
                       buyTicket={::this.buyTicket}
                       searchAirports={::this.searchAirports}/>
        </AltContainer>
    }
}