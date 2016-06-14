import {default as React, Component} from "react";
import {Card, Row, Col} from '../../components';
import _ from 'lodash';
import Moment from 'moment';
import Immutable from 'immutable';
import Later from 'later';

if (typeof window !== 'undefined') {
    require('react-select/dist/react-select.css');
}

export default class IndexView extends Component {
    constructor(props) {
        super(props);

        this.markers = [];

        this.state = {
            selectedFlights: [],
            valueFrom: '',
            displayFrom: false,
            displayTo: false,
            selectedAirportFrom: '',
            selectedAirportTo: '',
            dateFrom: '',
            lastSelected: ''
        };
    }

    componentDidMount() {
        let datepickerFrom = $('.datepickerFrom').pickadate({
            selectMonths: true,
            selectYears: 15
        });

        let datepickerTo = $('.datepickerTo').pickadate({
            selectMonths: true,
            selectYears: 15
        });

        var sched = Later.parse.text('every 5 mins'),
            occurrences = Later.schedule(sched).next(10);

        for(var i = 0; i < 10; i++) {
            console.log(occurrences[i]);
        }

        Moment();

        this.datepickerFrom = datepickerFrom.pickadate('picker');
        this.datepickerTo = datepickerTo.pickadate('picker');

        this.renderMarkers();
        this.renderPolylines();
        this.centerMapBetweenMarkers();
    }

    componentDidUpdate() {
        if (this.mapRef) {
            this.map = new google.maps.Map(this.mapRef);
            // if(!this.map){
            //     this.map = new google.maps.Map(this.mapRef);
            // } else if (this.props.connections.length === 0) {
            //     this.map = '';
            // }
        }

        this.clearMarkers();
        this.clearPolyline();

        this.renderMarkers();
        this.renderPolylines();
        this.centerMapBetweenMarkers();
    }

    searchFlight() {
        if (this.state.selectedAirportFrom && this.state.selectedAirportTo) {
            let dateFrom = this.datepickerFrom.get('select', 'yyyy/mm/dd');
            this.dateFrom = dateFrom.split('/');

            if (dateFrom) {
                this.state.selectedFlights = [];
                dateFrom = dateFrom.split('/');
                this.state.dateFrom = Moment().year(parseInt(dateFrom[0])).month(parseInt(dateFrom[1]) - 1).date(parseInt(dateFrom[2]));
                this.state.lastSelected = Moment().year(parseInt(dateFrom[0])).month(parseInt(dateFrom[1]) - 1).date(parseInt(dateFrom[2]));
                this.props.search(this.state.selectedAirportFrom.value, this.state.selectedAirportTo.value);
            } else {
                Materialize.toast('Należy wybrać datę wylotu!', 4000);
            }
        } else {
            Materialize.toast('Należy wybrać miejsce wylotu, oraz docelowe!', 4000);
        }
    }

    centerMapBetweenMarkers() {
        if (!this.map) return;

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
        if (this.flightPath) this.flightPath.setMap(null);
    }

    clearMarkers() {
        if (!this.markers) return;

        _.each(this.markers, (marker) => {
            marker.setMap(null);
        });

        this.markers = [];
    }

    selectFlight(i, date, hours) {
        date.add(hours, 'hours');

        this.state.selectedFlights.push({
            id: i,
            date: date
        });

        this.setState({selectedFlights: this.state.selectedFlights, lastSelected: date});
    };

    unSelectFlight(i) {
        let selected = _.take(this.state.selectedFlights, i);
        let last = selected.length > 0 ? selected[selected.length - 1].date : Moment().year(parseInt(this.dateFrom[0])).month(parseInt(this.dateFrom[1]) - 1).date(parseInt(this.dateFrom[2]));

        this.setState({selectedFlights: selected, lastSelected: last});
    };

    buyTicket() {
        if (this.state.selectedFlights.length === this.props.flight.length - 1) {
            let ticket = _.map(this.state.selectedFlights, (flight, i) => {
                let rid = this.props.connections[i][flight.id].rid;

                return {
                    clientid: localStorage.userId ? localStorage.userId : sessionStorage.userId,
                    flightid: rid.substr(1, rid.length),
                    date: flight.date.format("H:mm Y/MM/DD")
                };
            });

            this.props.buyTicket(ticket);
        } else {
            Materialize.toast('Proszę wybrać wszystkie połączenia!', 4000);
        }
    }

    getNextDate(h, dayOfWeek, monthOfYear) {
        let day = dayOfWeek === 0 ? "*" : dayOfWeek - 1;
        let month = monthOfYear === 0 ? "*" : monthOfYear - 1;
        let hour = h === 0 ? "*" : h - 1;

        let cronDate = Later.parse.cron(`* ${hour} * ${month} ${day}`);
        let last = this.state.lastSelected;

        return Later.schedule(cronDate).next(1, new Date(last.year(), last.month(), last.date(), last.hours()));
    }

    renderArilinesBetween(index) {
        if (this.props.connections[index] && this.props.connections[index].length > 0) {
            return _.map(this.props.connections[index], (connection, i) => {
                let selectedLength = this.state.selectedFlights.length;
                let className = "collection-item";
                className = `${className} ${selectedLength <= index ? selectedLength === index ? "not-selected" : "disabled" : this.state.selectedFlights[index].id === i ? "active" : "disabled"}`;

                let nextDate = this.getNextDate(parseInt(connection.hour), parseInt(connection.dayOfWeek), parseInt(connection.monthOfYear));

                let onClickFunction = selectedLength <= index ? selectedLength === index ? this.selectFlight.bind(this, i, Moment(nextDate), parseInt(connection.duration)) : ()=> {
                } : this.state.selectedFlights[index].id === i ? this.unSelectFlight.bind(this, index) : ()=> {
                }

                let date = <div />;

                if (selectedLength === index) {
                    date = <span><strong>Data:</strong> <span>{Moment(nextDate).format("H:mm Y/MM/DD")}</span></span>;
                } else if(this.state.selectedFlights[index] && this.state.selectedFlights[index].id === i) {
                    date = <span><strong>Data:</strong> <span>{Moment(this.state.selectedFlights[index].date).format("H:mm Y/MM/DD")}</span></span>;
                }

                return <a className={className}
                          onClick={onClickFunction}>
                    <strong>{connection.airline}</strong>,&nbsp;
                    <strong>Liczba miejsc:</strong> {connection.seats},&nbsp;
                    <strong>Czas podróży:</strong> {connection.duration},&nbsp;
                    <strong>Cena:</strong> {connection.price},&nbsp;
                    {date}
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
        return `<h4>${airport.name}</h4><strong>Kraj</strong>: ${airport.country}<br /><strong>Miejscowość</strong>: ${airport.city}`;
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
                <strong>{this.props.connections[i][flight.id].airline}</strong>,&nbsp;
                <strong>Liczba miejsc:</strong> {this.props.connections[i][flight.id].seats},&nbsp;
                <strong>Cena:</strong> {this.props.connections[i][flight.id].price}
                <strong>Data:</strong> {flight.date.format("H:mm Y/MM/DD")}
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

    airportsFromChange(e) {
        this.props.searchAirports('airportsFrom', e.target.value);
    }

    airportsToChange(e) {
        this.props.searchAirports('airportsTo', e.target.value);
    }

    selectAirport(airport, property) {
        this.setState({
            [property]: airport
        });
    }

    renderFoundAirports(property, display, selected) {
        if (this.props[property].length > 0 && this.state[display]) {
            return <ul className="dropdown">
                {
                    _.map(this.props[property], (airport, i) => {
                        return <li key={i} onClick={this.selectAirport.bind(this, airport, selected)}
                                   dangerouslySetInnerHTML={{__html: airport.labelForDropDown}}/>;
                    })
                }
            </ul>;
        }

        return <div />;
    }

    onFocusInput(display) {
        setTimeout(() => {
            this.setState({
                [display]: true
            })
        }, 100);
    }

    onBlurInput(display) {
        setTimeout(() => {
            this.setState({
                [display]: false
            })
        }, 1000);
    }

    clearSelected(property) {
        this.setState({
            [property]: ''
        })
    }

    renderAirportFrom() {
        if (this.state.selectedAirportFrom) {
            return <span>
                <h6>Miejsce wylotu</h6>
                <span className="chip">
                        {this.state.selectedAirportFrom.label}
                        <i className="material-icons"
                           onClick={this.clearSelected.bind(this, 'selectedAirportFrom')}>close</i>
                </span>
            </span>;
        }

        return <span>
            <input id="start" type="text" className="validate"
                   onFocus={this.onFocusInput.bind(this, 'displayFrom')}
                   onBlur={this.onBlurInput.bind(this, 'displayFrom')}
                   onChange={::this.airportsFromChange}/>
                            <label htmlFor="start">Miejsce wylotu</label>
            {this.renderFoundAirports('airportsFrom', 'displayFrom', 'selectedAirportFrom')}
        </span>;
    }

    renderAirportTo() {
        if (this.state.selectedAirportTo) {
            return <span>
                <h6>Miejsce docelowe</h6>
                <span className="chip">
                    {this.state.selectedAirportTo.label}
                    <i className="material-icons" onClick={this.clearSelected.bind(this, 'selectedAirportTo')}>close</i>
                </span>
            </span>;
        }

        return <span>
            <input id="meta" type="text" className="validate"
                   onFocus={this.onFocusInput.bind(this, 'displayTo')}
                   onBlur={this.onBlurInput.bind(this, 'displayTo')}
                   onChange={::this.airportsToChange}/>
                            <label htmlFor="meta">Miejsce docelowe</label>
            {this.renderFoundAirports('airportsTo', 'displayTo', 'selectedAirportTo')}
        </span>;
    }

    render() {
        return <div>
            <Card>
                <Card.Content>
                    <Card.Title>Wyszukiwanie</Card.Title>
                    <Row>
                        <Col s={6} className="input-field">
                            {this.renderAirportFrom()}
                        </Col>
                        <Col s={6} className="input-field">
                            {this.renderAirportTo()}
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12}>
                            <label>Dzień wylotu</label>
                            <input className="datepickerFrom"/>
                        </Col>
                    </Row>
                </Card.Content>
                <Card.Action style={{textAlign: "right"}}>
                    <a onClick={::this.searchFlight}>Wyszukaj</a>
                </Card.Action>
            </Card>
            {
                (() => {
                    if (this.props.connections.length === 0) {
                        if (this.props.searched) {
                            return <h4 style={{textAlign: "center", color: "#aaa", marginTop: "55px"}}>Brak połączenia
                                pomiędzy
                                lotniskami!</h4>;
                        }

                        return <h4 style={{textAlign: "center", color: "#aaa", marginTop: "55px"}}>Użyj formularza
                            wyszukiwania!</h4>;
                    }

                    return <Row>
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
                            {
                                (()=> {
                                    if((localStorage.authorizationToken || sessionStorage.authorizationToken) && (localStorage.owner === "false" || sessionStorage.owner === "false")) {
                                        return <Card>
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
                                                        <span className="blue darken-1"
                                                              style={{borderRadius: "2px", fontSize: "30px", color: "white", display: "block", float: "right", padding: "0 5px", margin: "10px 0 0"}}>
                                                            {this.calculateTicketPrice()} PLN
                                                        </span>
                                                    </Col>
                                                </Row>
                                            </Card.Content>
                                            <Card.Action style={{textAlign: "right"}}>
                                                <a onClick={::this.buyTicket}>Kup bilet</a>
                                            </Card.Action>
                                        </Card>
                                    }

                                    return <div />
                                })()
                            }
                        </Col>
                    </Row>;
                })()
            }
        </div>;
    }
}