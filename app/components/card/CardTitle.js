import React, {Component} from 'react';

export default class CardTitle extends Component {
    static defaultProps = {
        className: "",
        style: {}
    };

    static propTypes = {
        className: React.PropTypes.string,
        style: React.PropTypes.object
    };

    render() {
        return <span className={`card-title ${this.props.className}`} style={this.props.style}>
            {this.props.children}
        </span>;
    }
}