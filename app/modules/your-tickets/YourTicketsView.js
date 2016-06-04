import _ from 'lodash';
import React from 'react';
import {Row, Col, Card} from '../../components';

export default class YourTicketsView extends React.Component {
    renderTickets() {
        if(this.props.tickets.length > 0) {
            return _.map(this.props.tickets, (ticket) => {
                return <li className="collection-item avatar">
                    <i className="material-icons circle">local_airport</i>
                    <span className="title">{ticket.from} -> {ticket.to}</span>
                    <p>
                        <strong>Cena: </strong>{ticket.price} zł
                    </p>
                </li>
            });
        }

        return <li className="collection-item">Brak zakupionych biletów</li>
    }

    render() {
        return <Row>
            <Col s={8} os={2}>
                <ul className="collection with-header">
                    <li className="collection-header">
                        <h4>Twoje zakupione bilety</h4>
                    </li>
                    {this.renderTickets()}
                </ul>
            </Col>
        </Row>;
    }
}