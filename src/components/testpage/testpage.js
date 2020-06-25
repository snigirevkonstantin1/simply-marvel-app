import React from 'react';
import { useState } from 'react';
import {useSpring, animated} from 'react-spring'
import {Keyframes} from 'react-spring/renderprops'

import './testpage.css'


const TestPage = ({lengths}) => {
    const [active, toggle] = useState(false);
    const [size, setSize] = useState(0);
    console.log(lengths)
    const createArr = (arr, l, s, count)=> {
        if (arr.length < s){
            arr.push(Math.floor((l/s) * count))
            return createArr(arr, l, s, count+=1)
        }
        return arr
    }
    const sizeRange = []
    createArr(sizeRange, 100, lengths, 1)
    
    const props = useSpring ({
        to: async (next, cancel) => {
            await next({ width: sizeRange[size] *4});
          },
          from: { width: sizeRange[size] }
    })
    return (
        <div className='area' onClick={()=> toggle(!active)} onClick={() => setSize(size + 1)}> 
            <animated.div className='fill' style={{width: (props.width)  }} />
            <animated.div className='content'>
                {props.width.interpolate(x => Math.floor(x / 4))}
            </animated.div>
        </div>
    )
}

export default TestPage