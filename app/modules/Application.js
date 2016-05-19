import React from 'react';
import {NavBar} from '../components';
import {Link} from 'react-router';

export default class Application extends React.Component {
    render() {
        return <div style={{height: "100%"}}>
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">Wyszukiwarka połączeń lotniczych</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="login">Logowanie</Link></li>
                        <li><Link to="registration">Rejestracja</Link></li>
                    </ul>
                </div>
            </nav>
            <div className="container">
                {this.props.children}
            </div>
        </div>;
    }
}