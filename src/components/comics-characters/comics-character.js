import React from 'react';
import { useState, useEffect } from 'react';
import {useSpring, animated, config} from 'react-spring'


const calc = (x, y) => {
    return [-(y - window.innerHeight / 2) / 60, (x - window.innerWidth / 2) / 60, 1.1]}
const trans = (x, y, s) => `perspective(600px) rotateY(${y}deg) rotateX(${x}deg) scale(${s})`
const opacit = () => { return 0.9 }


const ComicsCharacters = ({marvelApi, url, onSelectCharacterd}) => {
    const [activeCharacter, setActiveCharacter] = useState(undefined);
    const [elemStyle, setElemStyle] = useSpring(() => ({ xys: [0, 0, 1], config: config.stiff, opacity: 1}))


    useEffect(()=> {
        marvelApi.getComicsCharacter(url)
        .then((data)=>setActiveCharacter(data))
    }, [url]);


    if (activeCharacter === undefined){
        return null
    }
// setElemStyle({ xys: calc(x, y), opacity: opacit(),}
// elemStyle.xys.interpolate(trans), opacity: elemStyle.opacity

    return (
        <animated.div className='comics__container' 
        onClick={()=>onSelectCharacterd(activeCharacter.id)}
        onMouseEnter={({ clientX: x, clientY: y }) => setElemStyle({ xys: calc(x, y), opacity: opacit(),})}
        onMouseLeave={() => setElemStyle({ xys: [0, 0, 1], opacity: 1 })}
        style={{ transform: elemStyle.xys.interpolate(trans), opacity: elemStyle.opacity}}
       >
            <div>{activeCharacter.name}</div>
            <div>
                <img src={activeCharacter.image} alt=""/>
            </div>
            <div></div>
    </animated.div>)
}

export default ComicsCharacters