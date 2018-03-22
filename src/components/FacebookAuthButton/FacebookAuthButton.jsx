import React from 'react'
import { facebookAuth, facebookAuthDisabled } from './styles.css'

export default function FacebookAuthButton ({onAuth, isFetching, isAuthed}) {
    return (
        <div>
            {isAuthed
            ?
                <button className={facebookAuthDisabled} disabled={true}>
                    {'You are logged in'}
                </ button>
            :
                <button className={facebookAuth} onClick={onAuth}>
                    {isFetching === true
                        ? 'Loading'
                        : 'Login with facebook'
                    }
                </ button>
            }
        </div>
    )
}