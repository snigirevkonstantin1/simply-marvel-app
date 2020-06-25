import React, { useEffect } from 'react';
import { WithMarvelService } from '../hoc';
import ItemDetails from '../item-details';
import { charactersLoaded, loadded } from '../../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Spiner from '../spiner';
import './all-characters-list.css';


const AllCharactersList = (props) => {
    const { marvelApi, charactersLoaded, characters, page, loading, loadded, onSelectCharacterd } = props;
    useEffect(()=>{
        loadded(); 
        marvelApi.getAllCharacters(page)
            .then((data)=>{charactersLoaded(data)})},
            [ page,charactersLoaded, loadded, marvelApi ]);

    if (loading) {
        return <Spiner />
    } else {
        return(
            <div className='container'>
                <div className='flexcontent'>
                {
                characters.map((person)=>{
                    return <ItemDetails
                    onSelectCharacterd={onSelectCharacterd} 
                    person={person}  
                    key={person.id} 
                    /> 
                })
            }
            </div>
        </div>);
    };
};


const mapStateToProps = ({ characters, page, loading, error}) => {
    return { characters, page, loading, };
};


//ownProps
const mapDispatchToProps = (dispatch) => {
    return {
        charactersLoaded: bindActionCreators(charactersLoaded, dispatch),
        loadded: bindActionCreators(loadded, dispatch),
        };
    };


export default WithMarvelService(
    connect(mapStateToProps, mapDispatchToProps)(AllCharactersList))
