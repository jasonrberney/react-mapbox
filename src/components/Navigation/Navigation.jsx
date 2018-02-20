import React, { Component } from 'react'
import { NavLinke, NavLink } from 'react-router-dom'
import { MapAddTrip } from '../MapAddTrip/MapAddTrip.jsx'
import { navContainer, link, active, container } from './styles.css'

class Navigation extends Component {
    render () {
        return (
            <div className='container'>
                <nav className='navContainer'>
                    <ul>
                        <li>
                            <NavLink exact className='link' activeClassName='active' to='/'>{'Home'}</NavLink>
                        </li>
                        <li>
                            <NavLink exact className='link' activeClassName='active' to='/mapjournal'>{'Map Journal'}</NavLink>
                        </li>
                        <li>
                            <button className='link' >{'Add A Trip'}</button>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navigation