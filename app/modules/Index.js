import {default as React, Component} from "react";

// import {GoogleMap, Marker, Polyline, GoogleMapLoader} from "react-google-maps";
// import {default as InfoBox} from "react-google-maps/lib/addons/InfoBox";

import {Card, Row, Col} from '../components';

import _ from 'lodash';

export default class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flight: [{
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
            }],
            first: true
        };
    }

    changeState() {
        if (this.state.first) {
            this.setState({
                flight: [{
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
                }],
                first: false
            });
        } else {
            this.setState({
                flight: [{
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
                }],
                first: true
            });
        }
    }

    componentDidMount() {
        $('.datepicker').pickadate({
            selectMonths: true,
            selectYears: 15
        });

        this.map = new google.maps.Map(this.mapRef, {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
    }

    renderFlight() {
        return _.map(this.state.flight, (airport) => {
            return <li className="collection-item">{airport.city}</li>
        });
    }

    renderMarkers() {
        // return _.map(this.state.flight, (airport, index) => {
        //     return <Marker key={index}
        //                    position={new google.maps.LatLng(airport.latitude, airport.longitude)} />;
        // });
    }

    getPolylines() {
        return _.map(this.state.flight, (airport, index) => {
            return new google.maps.LatLng(airport.latitude, airport.longitude);
        });
    }

    render() {
        let LatLngList = _.map(this.state.flight, (airport) => {
            return new google.maps.LatLng(airport.latitude, airport.longitude);
        });

        let latlngbounds = new google.maps.LatLngBounds();

        LatLngList.forEach(function (latLng) {
            latlngbounds.extend(latLng);
        });

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
                            <input className="datepicker" />
                        </Col>
                        <Col s={6}>
                            <label>Dzień powrotu</label>
                            <input className="datepicker" />
                        </Col>
                    </Row>
                </Card.Content>
                <Card.Action style={{textAlign: "right"}}>
                    <a onClick={::this.changeState}>Wyszukaj</a>
                </Card.Action>
            </Card>
            <Card style={{height: "500px"}}>
                <div ref={mapRef => this.mapRef = mapRef} style={{height: "100%"}}></div>
            </Card>
            <div>
                <ul className="collection with-header">
                    <li className="collection-header"><h4>Trasa przelotu</h4></li>
                    {this.renderFlight()}
                </ul>
            </div>
        </div>;
    }
}