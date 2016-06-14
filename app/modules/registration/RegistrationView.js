import React from 'react';

import {Card, Row, Col} from '../../components'
import { browserHistory } from 'react-router';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
            repeatPassword: "",
            email: "",
            name: "",
            surname: "",
            owner: false
        }
    }

    componentDidMount() {
        $('ul.tabs').tabs();
    }

    onChangeValue(property, e) {
        this.setState({[property]: e.target.value});
    }

    onChangeOwner(value) {
        this.setState({owner: value});
    }

    register() {
        if(this.state.owner) {
            this.props.registerOwner(this.state.login, this.state.password, this.state.repeatPassword, this.state.email, this.state.name);
        } else {
            this.props.register(this.state.login, this.state.password, this.state.repeatPassword, this.state.email, this.state.name, this.state.surname);
        }
    }
    
    render() {
        return <Row>
            <Col l={6} ol={3} m={12} s={12}>
                <Card>
                    <Card.Content>
                        <Card.Title>Rejestracja</Card.Title>
                        <Row>
                            <Col s={12}>
                                <ul className="tabs">
                                    <li className="tab col s3"><a href="#test1" onClick={this.onChangeOwner.bind(this, false)}>Użytkownik</a></li>
                                    <li className="tab col s3"><a href="#test2" onClick={this.onChangeOwner.bind(this, true)}>Linie lotnicze</a></li>
                                </ul>
                            </Col>
                            <Col id="test1" s={12}>
                                <Row>
                                    <Col s={12} className="input-field">
                                        <input id="login" type="text" className="validate" value={this.state.login} onChange={this.onChangeValue.bind(this, 'login')}/>
                                        <label htmlFor="login">Login</label>
                                    </Col>
                                    <Col s={12} className="input-field">
                                        <input id="password" type="password" className="validate" value={this.state.password} onChange={this.onChangeValue.bind(this, 'password')}/>
                                        <label htmlFor="password">Hasło</label>
                                    </Col>
                                    <Col s={12} className="input-field">
                                        <input id="repeat-password" type="password" className="validate" value={this.state.repeatPassword} onChange={this.onChangeValue.bind(this, 'repeatPassword')}/>
                                        <label htmlFor="repeat-password">Powtórz hasło</label>
                                    </Col>
                                    <Col s={12} className="input-field">
                                        <input id="email" type="email" className="validate" value={this.state.email} onChange={this.onChangeValue.bind(this, 'email')}/>
                                        <label htmlFor="email">E-mail</label>
                                    </Col>
                                    <Col s={12} className="input-field">
                                        <input id="name" type="text" className="validate" value={this.state.name} onChange={this.onChangeValue.bind(this, 'name')}/>
                                        <label htmlFor="name">Imię</label>
                                    </Col>
                                    <Col s={12} className="input-field">
                                        <input id="surname" type="text" className="validate" value={this.state.surname} onChange={this.onChangeValue.bind(this, 'surname')}/>
                                        <label htmlFor="surname">Nazwisko</label>
                                    </Col>
                                </Row>
                            </Col>
                            <Col id="test2" s={12}>
                                <Row>
                                    <Col s={12} className="input-field">
                                        <input id="login" type="text" className="validate" value={this.state.login} onChange={this.onChangeValue.bind(this, 'login')}/>
                                        <label htmlFor="login">Login</label>
                                    </Col>
                                    <Col s={12} className="input-field">
                                        <input id="password" type="password" className="validate" value={this.state.password} onChange={this.onChangeValue.bind(this, 'password')}/>
                                        <label htmlFor="password">Hasło</label>
                                    </Col>
                                    <Col s={12} className="input-field">
                                        <input id="repeat-password" type="password" className="validate" value={this.state.repeatPassword} onChange={this.onChangeValue.bind(this, 'repeatPassword')}/>
                                        <label htmlFor="repeat-password">Powtórz hasło</label>
                                    </Col>
                                    <Col s={12} className="input-field">
                                        <input id="email" type="email" className="validate" value={this.state.email} onChange={this.onChangeValue.bind(this, 'email')}/>
                                        <label htmlFor="email">E-mail</label>
                                    </Col>
                                    <Col s={12} className="input-field">
                                        <input id="name" type="text" className="validate" value={this.state.name} onChange={this.onChangeValue.bind(this, 'name')}/>
                                        <label htmlFor="name">Nazwa linii lotniczej</label>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Content>
                    <Card.Action style={{textAlign: "right"}}>
                        <a href="#" onClick={::this.register}>Rejestracja</a>
                    </Card.Action>
                </Card>
            </Col>
        </Row>;
    }
}