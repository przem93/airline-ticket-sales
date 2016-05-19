import React from 'react';
import {Link} from 'react-router';

export default class NavBarLogo extends React.Component {
    static defaultProps  = {
        href: "#"
    };

    render(){
        return <Link to={this.props.href} className="brand-logo">{this.props.children}</Link>;
    }
}