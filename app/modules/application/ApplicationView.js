import React from 'react';
import {NavBar} from '../../components';
import {Link} from 'react-router';

export default class ApplicationView extends React.Component {
    componentDidMount() {
        if (this.props.LoginStore.logged) {
            setTimeout(() => {
                Materialize.toast('Zalogowano!', 4000);
            }, 1000);
        }
    }

    renderNavMenu() {
        if (this.props.LoginStore.logged) {
            if (this.props.LoginStore.owner) {
                return <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="your-account">Twoje konto</Link></li>
                    <li><Link to="your-flights">Twoje przeloty</Link></li>
                    <li><a onClick={this.props.logoutAction}>Wyloguj</a></li>
                </ul>;
            }

            return <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="your-account">Twoje konto</Link></li>
                <li><Link to="your-tickets">Twoje bilety</Link></li>
                <li><a onClick={this.props.logoutAction}>Wyloguj</a></li>
            </ul>;
        }

        return <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="login">Logowanie</Link></li>
            <li><Link to="registration">Rejestracja</Link></li>
        </ul>;
    }

    renderLoading() {
        if (this.props.SearchStore.loading) {
            return <div className="loading">
                <div className="spinner">
                    <div className="dot1"></div>
                    <div className="dot2"></div>
                </div>
            </div>;
        }

        return <div />
    }

    render() {
        return <div style={{height: "100%"}}>
            {this.renderLoading()}
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">Wyszukiwarka połączeń lotniczych</Link>
                    {this.renderNavMenu()}
                </div>
            </nav>
            <div className="container">
                {this.props.children}
            </div>
        </div>;
    }
}