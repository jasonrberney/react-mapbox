import React from 'react'
import { container, title, subHeader } from './styles.css'

export default function Home () {
    return(
        <div className={container}>
            <p className={title}>{'Travel Young'}</p>
            <p className={subHeader}>{'Live your life through adventures, exploration and the natural beauty this world possess.\nAn interactive mapping journal for all your experiences.'}</p>
        </div>
    )
}