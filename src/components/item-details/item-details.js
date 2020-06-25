import React, { useState } from 'react';
import './item-details.css';
import { CSSTransition } from 'react-transition-group'


const ItemDetails = ( props ) => {
    const {name, description, image, id  } = props.person;
    const { onSelectCharacterd } = props;
    const [visibility, setVisibility] = useState(false)
    return(
        <div className='flexcontent__child transform__content' 
        onMouseEnter={ ()=>setVisibility(true)} 
        onMouseLeave={()=> setVisibility(false)} >
            <h3 className='comicshead'>{name}</h3>
            <img src={image} className='ml-3 picture' alt="oops"/>
            <CSSTransition in={visibility} 
            timeout={{
            appear: 500,
            enter: 2000,
            exit: 1000,}}
                classNames='option'
                unmountOnExit
                onEnter={()=> setVisibility(true)}
                onExited={()=> setVisibility(false)}>
                    <div className='tryanimation'>
                    <p className='sans mb-0'>{description}</p>
                    <span className="btn btn-primary btn-lg" onClick={()=>onSelectCharacterd(id)} role="button">Learn more</span>
                    </div>
            </CSSTransition> 

        </div>
    );
};


export default ItemDetails
