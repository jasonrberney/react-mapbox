import React from 'react'
import { facebookAuth } from './styles.css'

export default function FacebookAuthButton ({onAuth, isFetching}) {
    return (
        <div>
            <button className={facebookAuth} onClick={onAuth}>
                {isFetching === true
                    ? 'Loading'
                    : 'Login with facebook'
                }
            </ button>
        </div>
    )
}