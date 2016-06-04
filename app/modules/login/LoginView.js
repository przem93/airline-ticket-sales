import React from 'react';
import {Card, Row, Col} from '../../components';

export default class LoginView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
            rememberLogin: false
        }
    }

    componentDidMount() {
        $('ul.tabs').tabs();
    }

    onChangeValue(property, e) {
        this.setState({[property]: e.target.value});
    }

    onChangeRemember(e) {
        this.setState({rememberLogin: e.target.checked});
    }

    render() {
        return <Row>
            <Col s={6} os={3}>
                <Card>
                    <Card.Content>
                        <Card.Title>Logowanie</Card.Title>
                        <Col s={12}>
                            <ul className="tabs">
                                <li className="tab col s3"><a href="#test1">Użytkownik</a></li>
                                <li className="tab col s3"><a href="#test2">Linie lotnicze</a></li>
                            </ul>
                        </Col>
                        <Col id="test1" s={12}>
                            <Row>
                                <Col s={12} className="input-field">
                                    <input id="last_name"
                                           type="text"
                                           className="validate"
                                           onChange={this.onChangeValue.bind(this, 'login')}/>
                                    <label htmlFor="last_name">Login</label>
                                </Col>
                                <Col s={12} className="input-field">
                                    <input id="last_name"
                                           type="password"
                                           className="validate"
                                           onChange={this.onChangeValue.bind(this, 'password')}/>
                                    <label htmlFor="last_name">Hasło</label>
                                </Col>
                                <p>
                                    <input type="checkbox"
                                           id="remember"
                                           onChange={::this.onChangeRemember}/>
                                    <label htmlFor="remember">Zapamiętaj</label>
                                </p>
                            </Row>
                        </Col>
                        <Col id="test2" s={12}>
                            <Row>
                                <Col s={12} className="input-field">
                                    <input id="last_name"
                                           type="text"
                                           className="validate"
                                           onChange={this.onChangeValue.bind(this, 'login')}/>
                                    <label htmlFor="last_name">Login</label>
                                </Col>
                                <Col s={12} className="input-field">
                                    <input id="last_name"
                                           type="password"
                                           className="validate"
                                           onChange={this.onChangeValue.bind(this, 'password')}/>
                                    <label htmlFor="last_name">Hasło</label>
                                </Col>
                                <p>
                                    <input type="checkbox"
                                           id="remember"
                                           value={this.state.rememberLogin}
                                           onChange={::this.onChangeRemember}/>
                                    <label htmlFor="remember">Zapamiętaj</label>
                                </p>
                            </Row>
                        </Col>
                    </Card.Content>
                    <Card.Action style={{textAlign: "right"}}>
                        <a onClick={this.props.loginAction.bind(this, this.state.login, this.state.password, this.state.rememberLogin)}>Zaloguj</a>
                    </Card.Action>
                </Card>
            </Col>
        </Row>;
    }
}