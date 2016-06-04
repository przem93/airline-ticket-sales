import {default as React, Component} from "react";
import AltContainer from 'alt-container';
import IndexView from './IndexView';
import SearchActions from '../../actions/SearchActions';
import SearchStore from '../../stores/SearchStore';

export default class Index extends Component {
    search() {
        SearchActions.search();
    }

    render() {
        return <AltContainer store={SearchStore}>
            <IndexView search={::this.search} />
        </AltContainer>
    }
}