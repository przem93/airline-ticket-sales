import React from 'react';
import {Card, Row, Col} from '../../components';
import {Link} from 'react-router';

export default class AddFlightView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valueFrom: '',
            displayFrom: false,
            displayTo: false,
            selectedAirportFrom: '',
            selectedAirportTo: '',
            dateFrom: '',
            lastSelected: '',
            hour: "0",
            day: "0",
            month: "0",
            price: "0",
            duration: "0",
            seats: "0"
        };
    }

    componentDidMount() {

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
        if (this.props.SearchStore[property].length > 0 && this.state[display]) {
            return <ul className="dropdown">
                {
                    _.map(this.props.SearchStore[property], (airport, i) => {
                        return <li key={i} onClick={this.selectAirport.bind(this, airport, selected)}
                                   dangerouslySetInnerHTML={{__html: airport.labelForDropDown}}/>;
                    })
                }
            </ul>;
        }

        return <div />;
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

    changeMonth(e) {
        this.state.month = e.target.value;
    }

    changeDay(e) {
        this.state.day = e.target.value;
    }

    changeHour(e) {
        this.state.hour = e.target.value;
    }

    onChangeDuration(e) {
        this.state.duration = e.target.value;
    }

    onChangeSeats(e) {
        this.state.seats = e.target.value;
    }

    onChangePrice(e) {
        this.state.price = e.target.value;
    }

    addFlight(){
        if(this.state.selectedAirportFrom && this.state.selectedAirportTo) {
            this.props.addFlight(
                this.state.selectedAirportFrom.value,
                this.state.selectedAirportTo.value,
                this.state.month,
                this.state.day,
                this.state.hour,
                this.state.seats,
                this.state.duration,
                this.state.price
            );
        } else {
            Materialize.toast('Uzupełnij wszystkie pola!', 4000);
        }
    }

    render() {
        return <Row>
            <Col l={12}>
                <Card>
                    <Card.Content>
                        <Card.Title>Dodawanie przelotu</Card.Title>
                        <Row>
                            <Col s={6} className="input-field">
                                {this.renderAirportFrom()}
                            </Col>
                            <Col s={6} className="input-field">
                                {this.renderAirportTo()}
                            </Col>
                        </Row>
                        <Row>
                            <Col s={4}>
                                <label>Miesiąc</label>
                                <select onChange={::this.changeMonth}>
                                    <option value="0">każdy</option>
                                    <option value="1">styczeń</option>
                                    <option value="2">luty</option>
                                    <option value="3">marzec</option>
                                    <option value="4">kwiecień</option>
                                    <option value="5">maj</option>
                                    <option value="6">czerwiec</option>
                                    <option value="7">lipiec</option>
                                    <option value="8">sierpień</option>
                                    <option value="9">wrzesień</option>
                                    <option value="10">październik</option>
                                    <option value="11">listopad</option>
                                    <option value="12">grudzień</option>
                                </select>
                            </Col>
                            <Col s={4}>
                                <label>Dzień tygodnia</label>
                                <select onChange={::this.changeDay}>
                                    <option value="0">każdy</option>
                                    <option value="1">poniedziałek</option>
                                    <option value="2">wtorek</option>
                                    <option value="3">środa</option>
                                    <option value="4">czwartek</option>
                                    <option value="5">piatek</option>
                                    <option value="6">sobota</option>
                                    <option value="7">niedziela</option>
                                </select>
                            </Col>
                            <Col s={4}>
                                <label>Godzina</label>
                                <select onChange={::this.changeHour}>
                                    <option value="0">każda</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col s={4} className="input-field">
                                <input id="duration" type="number" className="validate"
                                       onChange={::this.onChangeDuration}/>
                                <label htmlFor="duration">Czas podróży</label>
                            </Col>
                            <Col s={4} className="input-field">
                                <input id="seats" type="number" className="validate"
                                       onChange={::this.onChangeSeats}/>
                                <label htmlFor="seats">Liczba miejsc</label>
                            </Col>
                            <Col s={4} className="input-field">
                                <input id="price" type="number" className="validate"
                                       onChange={::this.onChangePrice}/>
                                <label htmlFor="price">Cena</label>
                            </Col>
                        </Row>
                    </Card.Content>
                    <Card.Action>
                        <a onClick={::this.addFlight}>Dodaj przelot</a>
                    </Card.Action>
                </Card>
            </Col>
        </Row>;
    }
}