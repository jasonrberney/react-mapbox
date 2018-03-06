import React from 'react'
import { centeredContainer, largeHeader } from '../../sharedStyles/styles.css'
import FacebookAuthButton from '../../components/FacebookAuthButton/FacebookAuthButton.jsx'

export default function Login ({onAuth}) {
  return (
    <div className={centeredContainer}>
      <h1 className={largeHeader}>{'Authenticate'}</h1>
      <FacebookAuthButton onAuth={onAuth} />
    </div>
  )
}
