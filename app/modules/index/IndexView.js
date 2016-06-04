import {default as React, Component} from "react";
import {Card, Row, Col} from '../../components';

import _ from 'lodash';

export default class IndexView extends Component {
    constructor(props) {
        super(props);

        this.markers = [];

        this.state = {
            selectedFlights: []
        };
    }

    changeState() {
        this.props.search();
    }

    componentDidMount() {
        $('.datepicker').pickadate({
            selectMonths: true,
            selectYears: 15
        });

        this.map = new google.maps.Map(this.mapRef);

        this.renderMarkers();
        this.renderPolylines();
        this.centerMapBetweenMarkers();
    }

    componentDidUpdate() {
        this.clearMarkers();
        this.clearPolyline();

        this.renderMarkers();
        this.renderPolylines();
        this.centerMapBetweenMarkers();
    }

    centerMapBetweenMarkers() {
        let LatLngList = _.map(this.props.flight, (airport) => {
            return new google.maps.LatLng(airport.latitude, airport.longitude);
        });

        let latlngbounds = new google.maps.LatLngBounds();

        LatLngList.forEach(function (latLng) {
            latlngbounds.extend(latLng);
        });

        this.map.fitBounds(latlngbounds);
    }

    clearPolyline() {
        this.flightPath.setMap(null);
    }

    clearMarkers() {
        _.each(this.markers, (marker) => {
            marker.setMap(null);
        });

        this.markers = [];
    }

    selectFlight(i) {
        this.state.selectedFlights.push({
            id: i
        });

        this.setState({selectedFlights: this.state.selectedFlights});
    };

    unSelectFlight(i) {
        this.setState({selectedFlights: _.take(this.state.selectedFlights, i)});
    };

    renderArilinesBetween(index) {
        if (this.props.connections[index] && this.props.connections[index].length > 0) {
            return _.map(this.props.connections[index], (connection, i) => {
                let selectedLength = this.state.selectedFlights.length;
                let className = "collection-item";
                className = `${className} ${selectedLength <= index ? selectedLength === index ? "not-selected" : "disabled" : this.state.selectedFlights[index].id === i ? "active" : "disabled"}`;

                let onClickFunction = selectedLength <= index ? selectedLength === index ? this.selectFlight.bind(this, i) : ()=> {
                } : this.state.selectedFlights[index].id === i ? this.unSelectFlight.bind(this, index) : ()=> {
                }

                return <a className={className}
                          onClick={onClickFunction}>
                    <p>
                        <strong>{connection.name}</strong>,&nbsp;
                        <strong>Liczba miejsc:</strong> {connection.seats},&nbsp;
                        <strong>Cena:</strong> {connection.price}
                    </p>
                </a>
            });
        }

        return <div />;
    }

    renderFlight() {
        return _.map(this.props.flight, (airport, i) => {
            return <li className="collection-item">
                <h5>{airport.city}</h5>
                {this.renderArilinesBetween(i)}
            </li>
        });
    }

    renderContent(airport) {
        return `<h4>Nazwa lotniska</h4><strong>Miejscowość</strong>: ${airport.city}`;
    }

    renderMarkers() {
        _.each(this.props.flight, (airport, index) => {
            //setTimeout(() => {
            let infoWindow = new google.maps.InfoWindow({
                content: this.renderContent(airport)
            });

            let marker = new google.maps.Marker({
                position: {lat: airport.latitude, lng: airport.longitude},
                map: this.map,
                title: airport.city,
                //animation: google.maps.Animation.DROP
            });

            marker.addListener('click', () => {
                infoWindow.open(this.map, marker);
            });

            this.markers.push(marker);
            //}, 100 * index);
        });
    }

    getPolylines() {
        let toReturn = [];

        _.each(this.props.flight, (airport, index) => {
            if (this.state.selectedFlights.length >= index) {
                toReturn.push(new google.maps.LatLng(airport.latitude, airport.longitude));
            } else {
                return false;
            }
        });

        return toReturn;
    }

    renderPolylines() {
        this.flightPath = new google.maps.Polyline({
            path: this.getPolylines(),
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        this.flightPath.setMap(this.map);
    }

    renderTicketStations() {
        return _.map(this.props.flight, (airport, i) => {
            return <div className={`chip ${i === 0 ? 'red' : i === this.props.flight.length - 1 ? 'green' : 'yellow'}`}>
                {airport.city}
            </div>
        });
    }

    renderSelectedFlightTicket() {
        return _.map(this.state.selectedFlights, (flight, i) => {
            return <li>
                <strong>{this.props.connections[i][flight.id].name}</strong>,&nbsp;
                <strong>Liczba miejsc:</strong> {this.props.connections[i][flight.id].seats},&nbsp;
                <strong>Cena:</strong> {this.props.connections[i][flight.id].price}
            </li>
        });
    }

    calculateTicketPrice() {
        let price = 0;

        _.each(this.state.selectedFlights, (flight, i) => {
            price += this.props.connections[i][flight.id].price;
        });

        return price.toFixed(2);
    }

    render() {
        return <div>
            <Card>
                <Card.Content>
                    <Card.Title>Wyszukiwanie</Card.Title>
                    <Row>
                        <Col s={6} className="input-field">
                            <input id="last_name" type="text" className="validate"/>
                            <label htmlFor="last_name">Miejsce wylotu</label>
                        </Col>
                        <Col s={6} className="input-field">
                            <input id="last_name" type="text" className="validate"/>
                            <label htmlFor="last_name">Miejsce docelowe</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col s={6}>
                            <label>Dzień wylotu</label>
                            <input className="datepicker"/>
                        </Col>
                        <Col s={6}>
                            <label>Dzień powrotu</label>
                            <input className="datepicker"/>
                        </Col>
                    </Row>
                </Card.Content>
                <Card.Action style={{textAlign: "right"}}>
                    <a onClick={::this.changeState}>Wyszukaj</a>
                </Card.Action>
            </Card>
            <Row>
                <Col s={4} className="input-field">
                    <ul className="collection with-header">
                        <li className="collection-header"><h4>Trasa przelotu</h4></li>
                        {this.renderFlight()}
                    </ul>
                </Col>
                <Col s={8} className="input-field">
                    <Card style={{height: "500px"}}>
                        <div ref={mapRef => this.mapRef = mapRef} style={{height: "100%"}}></div>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Title>
                                <span style={{display: "block", float: "left", margin: "5px"}}>Twój bilet</span>
                                {this.renderTicketStations()}
                            </Card.Title>
                            <Row style={{clear: "both"}}>
                                <Col s={8}>
                                    <ul>
                                        {this.renderSelectedFlightTicket()}
                                    </ul>
                                </Col>
                                <Col s={4}>
                                    <span className="blue darken-1" style={{borderRadius: "2px", fontSize: "30px", color: "white", display: "block", float: "right", padding: "0 5px", margin: "10px 0 0"}}>
                                        {this.calculateTicketPrice()} PLN
                                    </span>
                                </Col>
                            </Row>
                        </Card.Content>
                        <Card.Action style={{textAlign: "right"}}>
                            <a onClick={::this.changeState}>Kup bilet</a>
                        </Card.Action>
                    </Card>
                </Col>
            </Row>
        </div>
            ;
    }
}