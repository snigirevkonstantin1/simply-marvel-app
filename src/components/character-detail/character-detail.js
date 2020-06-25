import React, { Component } from 'react';
import './character-detail.css';
import Spiner from '../spiner';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {totalLoad} from '../../actions';
import {TestPage} from '../testpage'
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


class CharacterDetals extends Component{
    state = {
        items: undefined
    }

    componentDidMount(){
        const {marvelApi, item} = this.props
        marvelApi(item.resourceURI).then((data)=> this.setState(()=> {
            return {
                items:data
            }
        })).then(()=>this.props.totalLoad)
    }


    componentWillUnmount(){
        this.setState(()=>{return{
            items: undefined
        }})
    }

    render(){
    const { children, onSelectItem, totalLoading} = this.props;
    const {items} = this.state
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
}
const mapStateToProps = ({totalLoading}) => {
    return { totalLoad };
};


const mapDispatchToProps = (dispatch) => {
    return {
        totalLoad: bindActionCreators(totalLoad, dispatch),
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetals)