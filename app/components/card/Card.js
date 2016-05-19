import React, {Component} from 'react';
import CardAction from './CardAction';
import CardContent from './CardContent';
import CardTitle from './CardTitle';

export default class Card extends Component {
    static Title = CardTitle;
    static Content = CardContent;
    static Action = CardAction;

    static defaultProps = {
        className: "",
        style: {}
    };

    static propTypes = {
        className: React.PropTypes.string,
        style: React.PropTypes.object
    };

    render() {
        return <div className={`card ${this.props.className}`} style={this.props.style}>
            {this.props.children}
        </div>;
    }
}