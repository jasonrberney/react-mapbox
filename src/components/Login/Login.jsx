import React from 'react'
import { centeredContainer, largeHeader } from '../../sharedStyles/styles.css'
import FacebookAuthButton from '../../components/FacebookAuthButton/FacebookAuthButton.jsx'

export default function Login ({onAuth, isFetching, isAuthed}) {
  return (
    <div className={centeredContainer}>
      <h1 className={largeHeader}>{'Authenticate'}</h1>
      <FacebookAuthButton isFetching={isFetching} onAuth={onAuth} isAuthed={isAuthed}/>
    </div>
  )
}
