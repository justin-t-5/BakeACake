import React from 'react'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1>BakeACake</h1></li>
            </ul>

            <ul>
                <li><a href='/' role='button'>Customize Cake</a></li>
                <li><a href='/cakes' role='button'>View Cakes</a></li>
            </ul>
            
        </nav>
    )
}

export default Navigation