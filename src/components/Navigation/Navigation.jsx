import React, { Component } from 'react'
import { Link } from 'react-router'
import { navContainer, link, active, container, addAdventure } from './styles.css'
import MapAddTrip from '../MapAddTrip/MapAddTrip.jsx'

function NavLinks ({isAuthed}) {
    const currentPath = window.location.hash
    return isAuthed === true
        ? <ul>
            <li><Link className={link} activeClassName={active} to='/'>{'Home'}</Link></li>
            <li><Link className={link} activeClassName={active} to='/mapjournal'>{'Map Journal'}</Link></li>
            <li className={addAdventure}>{currentPath.includes('mapjournal')
                ? <MapAddTrip />
                : null 
                }
            </li>
          </ul>
        : <ul>
            <li><Link className={link} activeClassName={active} to='/'>{'Home'}</Link></li>
            <li><Link className={link} activeClassName={active} to='/mapjournal'>{'Map Journal'}</Link></li>
          </ul>
}

function ActionLinks ({isAuthed}) {
    return isAuthed === true
    ? <ul>
        <li><Link className={link} activeClassName={active} to='/logout'>{'Logout'}</Link></li>
      </ul>
    : <ul>
        <li><Link className={link} activeClassName={active} to='/auth'>{'Login'}</Link></li>
      </ul>
}

export default function Navigation ({isAuthed}) {
    return (
        <div className={container}>
            <nav className={navContainer}>
                <NavLinks isAuthed={isAuthed} />
                <ActionLinks isAuthed={isAuthed} />
            </nav> 
        </div>
    )
}
