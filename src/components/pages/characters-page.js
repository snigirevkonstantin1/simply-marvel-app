import React from 'react';
import AllCharactersList from '../all-characters-list';
import Paggination from '../paggination';
import { withRouter } from 'react-router-dom';



const CharactersPage = ( { history, match } ) => {
    return (
        <React.Fragment>
            <AllCharactersList 
            onSelectCharacterd={(id) => history.push(`/characters/${id}`)} />
            <Paggination />
        </React.Fragment>

    )
};


export default withRouter(CharactersPage)