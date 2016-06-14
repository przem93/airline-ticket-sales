import _ from 'lodash';
import React from 'react';
import {Row, Col} from '../../components';
import {Link} from 'react-router';

export default class YourFlightsView extends React.Component {
    renderDate(hour, day, month) {
        let valueToReturn1 = '';
        let valueToReturn2 = '';
        let valueToReturn3 = '';

        switch(parseInt(month)){
            case 0:
                valueToReturn1 += 'każdego miesiąca';
                break;
            case 1:
                valueToReturn1 += 'każdego stycznia';
                break;
            case 2:
                valueToReturn1 += 'każdego lutego';
                break;
            case 3:
                valueToReturn1 += 'każdego marca';
                break;
            case 4:
                valueToReturn1 += 'każdego kwietnia';
                break;
            case 5:
                valueToReturn1 += 'każdego maja';
                break;
            case 6:
                valueToReturn1 += 'każdego czerwca';
                break;
            case 7:
                valueToReturn1 += 'każdego lipca';
                break;
            case 8:
                valueToReturn1 += 'każdego sierpnia';
                break;
            case 9:
                valueToReturn1 += 'każdego września';
                break;
            case 10:
                valueToReturn1 += 'każdego października';
                break;
            case 11:
                valueToReturn1 += 'każdego listopada';
                break;
            case 12:
                valueToReturn1 += 'każdego grudnia';
                break;
        }

        switch(parseInt(day)){
            case 0:
                valueToReturn2 += ' w każdy dzień tygodnia';
                break;
            case 1:
                valueToReturn2 += ' w każdy poniedziałek';
                break;
            case 2:
                valueToReturn2 += ' w każdy wtorek';
                break;
            case 3:
                valueToReturn2 += ' w każdą środę';
                break;
            case 4:
                valueToReturn2 += ' w każdy czwartek';
                break;
            case 5:
                valueToReturn2 += ' w każdy piątek';
                break;
            case 6:
                valueToReturn2 += ' w każdą sobotę';
                break;
            case 7:
                valueToReturn2 += ' w każdą niedzielę';
                break;
        }

        switch(parseInt(hour)){
            case 0:
                valueToReturn3 += ' co godzinę';
                break;
            default:
                valueToReturn3 += ` o godzinie ${hour}:00`;
                break;
        }

        return <span>
            <div className="chip">{valueToReturn1}</div>
            <div className="chip">{valueToReturn2}</div>
            <div className="chip">{valueToReturn3}</div>
        </span>;
    }

    renderTickets() {
        if(this.props.flights.length > 0) {
            return _.map(this.props.flights, (f) => {
                let flight = f[0];
                let urlId = flight.rid.substr(1, flight.rid.length);

                return <Link className="collection-item avatar" to={`/edit-flight/${urlId}`}>
                    <i className="material-icons circle">local_airport</i>
                    <span className="title">{flight.outName} -> {flight.inName}</span>
                    <p>
                        <strong>Cena: </strong>{parseFloat(flight.price).toFixed(2)} zł<br />
                        <strong>Miejsca: </strong>{flight.seats}<br />
                        <strong>Czas lotu: </strong>{flight.duration} h<br />
                        <strong>Przelot: </strong>{this.renderDate(flight.hour, flight.dayOfWeek, flight.monthOfYear)}
                    </p>
                </Link>
            });
        }

        return <li className="collection-item">Brak wprowadzonych lotów</li>
    }

    render() {
        return <Row>
            <Col s={8} os={2}>
                <ul className="collection with-header">
                    <li className="collection-header">
                        <h4>Twoje wprowadzone loty</h4>
                        <Link className="waves-effect waves-light btn" to="/add-flight">Dodaj przelot</Link>
                    </li>
                    {this.renderTickets()}
                </ul>
            </Col>
        </Row>;
    }
}