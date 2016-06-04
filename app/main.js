import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './Routing';

import 'jquery/dist/jquery';

if (typeof window !== 'undefined') {
    //window.$ = window.jQuery = require('jquery');
    require('materialize-css/bin/materialize.js');
    require('./styles/style.scss');
}

ReactDOM.render(<Routing/>, document.getElementById('application'));

