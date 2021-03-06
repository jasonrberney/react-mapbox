import React, { Component } from 'react'
import { NavLinke, NavLink } from 'react-router-dom'
import MapAddTrip from '../MapAddTrip/MapAddTrip.jsx'
import { navContainer, link, active, container } from './styles.css'

class Navigation extends Component {
    render () {
        const currentPath = window.location.pathname
        return (
            <div className={container}>
                <nav className={navContainer}>
                    <ul>
                        <li>
                            <NavLink exact className={link} activeClassName={active} to='/'>{'Home'}</NavLink>
                        </li>
                        <li>
                            <NavLink exact className={link} activeClassName={active} to='/mapjournal'>{'Map Journal'}</NavLink>
                        </li>
                        <li>
                            {currentPath.includes('mapjournal')
                                ? <MapAddTrip />
                                : null 
                            }
                        </li>
                    </ul>
                    
                </nav>
            </div>
        )
    }
}

export default Navigation