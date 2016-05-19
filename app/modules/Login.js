import React from 'react';
import {Card, Row, Col} from '../components';

export default class Login extends React.Component {
    render() {
        return <Row>
            <Col s={6} os={3}>
                <Card>
                    <Card.Content>
                        <Card.Title>Logowanie</Card.Title>
                        <Row>
                            <Col s={12} className="input-field">
                                <input id="last_name" type="text" className="validate"/>
                                <label htmlFor="last_name">Login</label>
                            </Col>
                            <Col s={12} className="input-field">
                                <input id="last_name" type="password" className="validate"/>
                                <label htmlFor="last_name">Hasło</label>
                            </Col>
                        </Row>
                    </Card.Content>
                    <Card.Action style={{textAlign: "right"}}>
                        <a>Zaloguj</a>
                    </Card.Action>
                </Card>
            </Col>
        </Row>;
    }
}