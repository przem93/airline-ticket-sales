import React from 'react';
import {Link} from 'react-router';

export default class Counter extends React.Component {
    render() {
        return <div>
            <h1>Strona główna</h1>
            <Link to="/login">Login</Link>
        </div>;
    }
}