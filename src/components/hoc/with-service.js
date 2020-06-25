import React from 'react';
import { MarvelServiceConsumer } from '../marvel-context';

const WithMarvelService = (Wrapped) => {
    return (props) => {
        return(
        <MarvelServiceConsumer>
            {
                (marvelApi)=>{
                    return(
                        <Wrapped {...props} marvelApi={marvelApi}/>
                        )
                    }
                }
            
        </MarvelServiceConsumer>
        )
    }
}


export default WithMarvelService