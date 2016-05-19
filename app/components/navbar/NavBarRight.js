import React from 'react';
import NavBarSideMenu from './NavBarSideMenu';

export default class NavBarRight extends NavBarSideMenu {
    static defaultProps = {
        side: 'right'
    };
}