import React from 'react';
import {Link} from 'react-router';

export default class ErrorNoMatch extends React.Component {
    render() {
        return <div>
            <h1>404 error</h1>;
            <Link to="/">To home page -></Link>
        </div>
    }
}