import React from 'react'
import { facebookAuth } from './styles.css'

export default function FacebookAuthButton ({onAuth}) {
    return (
        <div>
            <button className={facebookAuth} onClick={onAuth}>
                {'Login with facebook'}
            </ button>
        </div>
    )
}