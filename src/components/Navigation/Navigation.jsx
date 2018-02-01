import React, { Component } from 'react'
import { NavLinke, NavLink } from 'react-router-dom'
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
                            <NavLink className='link' activeClassName='active' to='/mapjournal'>{'Map Journal'}</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navigation