import React, {Component} from 'react';

export default class Col extends Component {
    static defaultProps = {
        style: {},
        id: ""
    };

    static propTypes = {
        className: React.PropTypes.string,
        style: React.PropTypes.object,
        l: React.PropTypes.number,
        m: React.PropTypes.number,
        s: React.PropTypes.number,
        ol: React.PropTypes.number,
        om: React.PropTypes.number,
        os: React.PropTypes.number,
        id: React.PropTypes.string
    };

    render() {
        let className = '';

        if(this.props.className) className += ` ${this.props.className}`;
        if(this.props.l) className += ` l${this.props.l}`;
        if(this.props.m) className += ` m${this.props.m}`;
        if(this.props.s) className += ` s${this.props.s}`;
        if(this.props.ol) className += ` offset-l${this.props.ol}`;
        if(this.props.om) className += ` offset-m${this.props.om}`;
        if(this.props.os) className += ` offset-s${this.props.os}`;

        return <div id={this.props.id} className={`col${className}`} style={this.props.style}>
            {this.props.children}
        </div>;
    }
}