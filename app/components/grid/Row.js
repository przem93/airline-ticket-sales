import React, {Component} from 'react';

export default class Row extends Component {
    static defaultProps = {
        className: "",
        style: {},
        id: ""
    };

    static propTypes = {
        className: React.PropTypes.string,
        style: React.PropTypes.object,
        id: React.PropTypes.string
    };

    render() {
        return <div id={this.props.id} className={`row ${this.props.className}`} style={this.props.style}>
            {this.props.children}
        </div>;
    }
}