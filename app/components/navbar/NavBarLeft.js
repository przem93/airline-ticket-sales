import React from 'react';
import NavBarSideMenu from './NavBarSideMenu';

export default class NavBarLeft extends NavBarSideMenu {
    static defaultProps = {
        side: 'left'
    };
}