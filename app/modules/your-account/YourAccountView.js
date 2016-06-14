import React from 'react';
import {Row, Col, Card} from '../../components';

export default class YourAccountView extends React.Component {
    updateField(property, e) {
        this.props.updateField(property, e.target.value);
    }

    render() {
        return <Row>
            <Col s={8} os={2}>
                <Card>
                    <Card.Content>
                        <Card.Title>Twoje konto {this.props.login}</Card.Title>
                        <Row>
                            <Col s={12} className="input-field">
                                <input id="emial"
                                       type="text"
                                       onChange={this.updateField.bind(this, 'email')}
                                       value={this.props.email}
                                       className="validate"/>
                                <label htmlFor="emial">E-mail</label>
                            </Col>
                        </Row>
                        {
                            (() => {
                                if (localStorage.owner === "true" || sessionStorage.owner == "true") {
                                    return <Row>
                                        <Col s={12} className="input-field">
                                            <input id="name"
                                                   type="text"
                                                   value={this.props.name}
                                                   onChange={this.updateField.bind(this, 'name')}
                                                   className="validate"/>
                                            <label htmlFor="name">Nazwa linii lotniczej</label>
                                        </Col>
                                    </Row>
                                }

                                return <Row>
                                    <Col s={12} className="input-field">
                                        <input id="name"
                                               type="text"
                                               value={this.props.name}
                                               onChange={this.updateField.bind(this, 'name')}
                                               className="validate"/>
                                        <label htmlFor="name">Imię</label>
                                    </Col>
                                    <Col s={12} className="input-field">
                                        <input id="surname"
                                               type="text"
                                               value={this.props.surname}
                                               onChange={this.updateField.bind(this, 'surname')}
                                               className="validate"/>
                                        <label htmlFor="surname">Nazwisko</label>
                                    </Col>
                                </Row>
                            })()
                        }
                    </Card.Content>
                    <Card.Action style={{textAlign: "right"}}>
                        <a onClick={this.props.save.bind(this, this.props.email, this.props.name, this.props.surname)}>Zapisz</a>
                    </Card.Action>
                </Card>
            </Col>
        </Row>;
    }
}