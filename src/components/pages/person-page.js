import React from 'react';
import { withRouter } from 'react-router-dom';
import Person from '../person'

const PersonPage = ({ history, id }) => {
    return (
        <React.Fragment>
            <Person 
            history={history}
            id={id} 
            onSelectItem={(id) => history.push(`/comics/${id}`)}
             />
        </React.Fragment>
    )

}


export default withRouter(PersonPage)