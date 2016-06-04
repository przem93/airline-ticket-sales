import React from 'react';
import {Row, Col, Card} from '../../components';

export default class YourAccountView extends React.Component {
    render() {
        return <Row>
            <Col s={8} os={2}>
                <Card>
                    <Card.Content>
                        <Card.Title>Twoje konto {this.props.login}</Card.Title>
                        <Row>
                            <Col s={12} className="input-field">
                                <input id="login"
                                       type="text"
                                       className="validate"/>
                                <label htmlFor="login">Login</label>
                            </Col>
                            <Col s={12} className="input-field">
                                <input id="emial"
                                       type="text"
                                       className="validate"/>
                                <label htmlFor="emial">E-mail</label>
                            </Col>
                            <Col s={12} className="input-field">
                                <input id="last_name"
                                       type="password"
                                       className="validate"/>
                                <label htmlFor="last_name">Nowe hasło</label>
                            </Col>
                        </Row>
                    </Card.Content>
                    <Card.Action style={{textAlign: "right"}}>
                        <a>Zapisz</a>
                    </Card.Action>
                </Card>
            </Col>
        </Row>;
    }
}