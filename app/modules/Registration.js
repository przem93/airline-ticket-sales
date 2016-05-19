import React from 'react';

import {Card, Row, Col} from '../components'

export default class Registration extends React.Component {
    register() {
        Materialize.toast('I am a toast!', 3000, 'rounded');
    }

    componentDidMount() {
        $('ul.tabs').tabs();
    }

    render() {
        return <Row>
            <Col s={6} os={3}>
                <Card>
                    <Card.Content>
                        <Card.Title>Rejestracja</Card.Title>
                        <Row>
                            <Col s={12}>
                                <ul className="tabs">
                                    <li className="tab col s3"><a href="#test1">Użytkownik</a></li>
                                    <li className="tab col s3"><a href="#test2">Linie lotnicze</a></li>
                                </ul>
                            </Col>
                            <Col id="test1" s={12}>
                                <Row>
                                    <Col s={12} className="input-field">
                                        <input id="last_name" type="text" className="validate"/>
                                        <label htmlFor="last_name">Login</label>
                                    </Col>

                                    <Col s={12} className="input-field">
                                        <input id="last_name" type="password" className="validate"/>
                                        <label htmlFor="last_name">Hasło</label>
                                    </Col>

                                    <Col s={12} className="input-field">
                                        <input id="last_name" type="password" className="validate"/>
                                        <label htmlFor="last_name">Powtórz hasło</label>
                                    </Col>

                                    <Col s={12} className="input-field">
                                        <input id="last_name" type="email" className="validate"/>
                                        <label htmlFor="last_name">E-mail</label>
                                    </Col>
                                </Row>
                            </Col>
                            <Col id="test2" s={12}>
                                <Row>
                                    <Col s={12} className="input-field">
                                        <input id="last_name" type="text" className="validate"/>
                                        <label htmlFor="last_name">Login</label>
                                    </Col>

                                    <Col s={12} className="input-field">
                                        <input id="last_name" type="password" className="validate"/>
                                        <label htmlFor="last_name">Hasło</label>
                                    </Col>

                                    <Col s={12} className="input-field">
                                        <input id="last_name" type="password" className="validate"/>
                                        <label htmlFor="last_name">Powtórz hasło</label>
                                    </Col>

                                    <Col s={12} className="input-field">
                                        <input id="last_name" type="email" className="validate"/>
                                        <label htmlFor="last_name">E-mail</label>
                                    </Col>

                                    <Col s={12} className="input-field">
                                        <input id="last_name" type="text" className="validate"/>
                                        <label htmlFor="last_name">Nazwa</label>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Content>
                    <Card.Action style={{textAlign: "right"}}>
                        <a href="#">Rejestracja</a>
                    </Card.Action>
                </Card>
            </Col>
        </Row>;
    }
}