import React from 'react';
import img from './MarvelLogo.svg.png'

const Header = () => {
    return (
        <header className='d-flex justify-content-center bg-dark'>
            <img src={img} alt='logo' />
        </header>
    )
}

export default Header