import React from 'react';

export default class NavBarSideMenu extends React.Component {
    static defaultProps = {
        side: 'left'
    };

    render(){
        return <ul id="nav-mobile" className={`${this.props.side} hide-on-med-and-down`}>
            <li><a href="sass.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">JavaScript</a></li>
        </ul>;
    }
}