import React from 'react';
import { useState } from 'react';
import Spiner from '../spiner'
import { useEffect } from 'react';


const ComicsImages = ({image, onChangeImage}) => {
    const [activeImage, setActiveImage] = useState(undefined);
    useEffect(()=>{
        setActiveImage(image)
    }, [activeImage])
    if (activeImage === undefined) {
        return <Spiner/>
    }
    return <img src={activeImage} alt="" onClick={()=>onChangeImage(activeImage)}/>


}

export default ComicsImages