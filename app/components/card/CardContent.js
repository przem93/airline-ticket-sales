import React, {Component} from 'react';

export default class CardContent extends Component {
    static defaultProps = {
        className: "",
        style: {}
    };

    static propTypes = {
        className: React.PropTypes.string,
        style: React.PropTypes.object
    };

    render() {
        return <div className={`card-content ${this.props.className}`} style={this.props.style}>
            {this.props.children}
        </div>;
    }
}