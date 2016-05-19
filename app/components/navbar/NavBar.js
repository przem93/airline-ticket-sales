import React from 'react';
import NavBarLeft from './NavBarLeft';
import NavBarRight from './NavBarRight';
import NavBarLogo from './NavBarLogo';


export default class NavBar extends React.Component {
    static Left = NavBarLeft;
    static Right = NavBarRight;
    static Logo = NavBarLogo;

    render() {
        return <nav>
            <div className="nav-wrapper">
                {this.props.children}
            </div>
        </nav>;
    }
}