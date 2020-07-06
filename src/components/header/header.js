import React from 'react';
import img from './MarvelLogo.svg.png';
import {useHistory} from 'react-router-dom'
import './header.css'

const Header = () => {
    const history = useHistory();
    return (
        <header className='d-flex justify-content-center bg-dark'>
            <img className='header__img' src={img} alt='logo' onClick={()=>history.push("/")}/>
        </header>
    )
}

export default Header