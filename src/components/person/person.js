import React, { Component } from 'react';
import { WithMarvelService } from '../hoc';
import { connect } from 'react-redux';
import { singleItemLoaded, loadded, singleItemClear } from '../../actions'
import { bindActionCreators } from 'redux';
import Spiner from '../spiner';
import './person.css';
import Slider from '../slider'



class Person extends Component {
    

    componentDidMount(){
        this.update() 
    };


    componentWillUnmount(){
        const {singleItemClear} = this.props;
        singleItemClear();
    };


    update(){
        const {marvelApi, id, singleItemLoaded, characters, loadded } = this.props;
        if (characters.length === 0){
            loadded();
            marvelApi.getOneCharacter(id)
            .then((data)=>singleItemLoaded(data))
            } else {
                try{
                    const item = characters.find((elem)=>elem.id == id);
                    if (item == undefined){
                        throw new Error('item not found')
                    }
                    singleItemLoaded(item)
                }
                catch(err){
                    marvelApi.getOneCharacter(id)
                    .then((data)=>singleItemLoaded(data))
                }
            };
    };


    render(){
        const { history, activeItem, marvelApi, onSelectItem } = this.props;
        if (activeItem == undefined){
            return <Spiner />
        }
        else{
            const { description, name, comics, events, series, image, stories, id} = activeItem;
            return (
                <div className='slider__container'>
                    <button className='btn btn-info btnchacter' onClick={() => history.goBack()}>&#9665;</button>
                    <div className='slider__content'>
                        <img className='slider__image' src={image} alt=""/>
                        <h1 className='person__head'>{name}</h1>
                    </div>
                    <table className='person_description container'>
                        <thead>
                            <tr>
                                <td><h2>Biography</h2></td>
                                <td><h3>{description}</h3></td>
                            </tr>
                        </thead>
                    </table>
                        <Slider id={id} 
                        items={comics}
                        marvelApi={marvelApi.getOneEvent}
                        onSelectItem={ onSelectItem}/>
                        <Slider id={id} 
                        items={events}
                        marvelApi={marvelApi.getOneEvent}/>
                        <Slider id={id} 
                        items={series}
                        marvelApi={marvelApi.getOneEvent}/>
                        <Slider id={id} 
                        items={stories}
                        marvelApi={marvelApi.getOneEvent}/>     
                </div>
            )
}}};


const mapStayToProps = ({activeItem, characters, loading}) => {
    return {
        activeItem,
        characters,
        loading
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        singleItemLoaded: bindActionCreators(singleItemLoaded, dispatch),
        loadded: bindActionCreators(loadded, dispatch),
        singleItemClear: bindActionCreators(singleItemClear, dispatch)
    }
}


export default WithMarvelService(connect(mapStayToProps, mapDispatchToProps)(Person))