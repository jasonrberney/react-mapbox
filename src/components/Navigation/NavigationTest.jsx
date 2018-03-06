import React, { Component } from 'react'
import { Link } from 'react-router'
import { navContainer, link, active, container } from './styles.css'

function NavLinks ({isAuthed}) {
    const currentPath = window.location.pathname
    return isAuthed === true
        ? <ul>
            <li><Link className={link} activeClassName={active} to='/'>{'Home'}</Link></li>
            <li><Link className={link} activeClassName={active} to='/mapjournal'>{'Map Journal'}</Link></li>
            <li>{currentPath.includes('mapjournal')
                ? <MapAddTrip />
                : null 
                }
            </li>
          </ul>
        : null
}

function ActionLinks ({isAuthed}) {
    return isAuthed === true
    ? <ul>
        <li><Link className={link} activeClassName={active} to='/logout'>{'Logout'}</Link></li>
      </ul>
    : <ul>
        <li><Link className={link} activeClassName={active} to='/'>{'Home'}</Link></li>
        <li><Link className={link} activeClassName={active} to='/auth'>{'Login'}</Link></li>
      </ul>
}

export default function NavigationTest ({isAuthed}) {
    return (
        <div className={container}>
            <nav className={navContainer}>
                <NavLinks isAuthed={isAuthed} />
                <ActionLinks isAuthed={isAuthed} />
            </nav> 
        </div>
    )
}
