import React, {Component} from 'react';

export default class CardAction extends Component {
    static defaultProps = {
        className: "",
        style: {}
    };

    static propTypes = {
        className: React.PropTypes.string,
        style: React.PropTypes.object
    };

    render() {
        return <div className={`card-action ${this.props.className}`} style={this.props.style}>
            {this.props.children}
        </div>;
    }
}