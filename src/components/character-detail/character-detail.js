import React from 'react';
import './character-detail.css';
import Spiner from '../spiner';

import { useEffect, useState } from 'react';
// import {TestPage} from '../testpage'
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import {totalLoad} from '../../actions';
//getComicsBooks

const Record = ({ items, onSelectItem}) => {
    return (
    <div className='boxes'>
        <h2 className='slider__head'>{items.title}</h2>
        <img src={items.images} alt="" className='slider__image'/>
        <p>{items.description}</p>
        <span className="btn btn-primary btn-lg" role="button" onClick={()=>onSelectItem(items.id)}>Learn more</span>
    </div>)
}
export { Record}


const CharacterDetals = (props) => {
    const [items, setItems] = useState(undefined)
    const {marvelApi, item, children, onSelectItem} = props
    useEffect(()=>{
        let cancelled = false
        marvelApi(item.resourceURI).then((data)=> !cancelled && setItems(data));
        return () => cancelled = true
    }, [item])


    if (items === undefined){
        return (
            <Spiner />
    )} else{
        return (
            <div className='boxes'>
                {
                    React.Children.map(children, (child)=>{
                        return React.cloneElement(child, { items, onSelectItem })
                    })
                }
            </div>
        )
    }
}


export default CharacterDetals