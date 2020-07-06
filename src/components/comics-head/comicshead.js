import React from 'react';
import Spiner from '../spiner'


const ComicsHead = ({title, activeImage, description, pageCount, load}) => {
    return (
        <div className='comics__description'>
        <div className="comics__title">
            <h1>{title}</h1>
        </div>
        <div className="comics__imageinforamtion">
        <div className="comics__image">
            {(load)? <div> Loading </div>: <img src={activeImage} alt=""/>}
        </div>
        <div className="comics__information">   
            <div className="comics__info">  
                <div className='comics__left'> <p>Description:</p> </div>
                <div className='comics__right'> <p>{description}</p> </div>
            </div>
            <div className="comics__page">  
                <div className='comics__left'><p>Pages:</p> </div>
                <div className='comics__right'> <p> {pageCount}</p> </div></div>
        </div>
    </div>
    </div>
    )
}


export default ComicsHead