import React , {Component} from 'react';
import {WithMarvelService} from '../hoc'
import './comics.css'
import { connect } from 'react-redux';
import {singleItemLoaded, singleItemClear, loadded} from '../../actions'
import { bindActionCreators } from 'redux';
import ComicsImages from '../comics-images';
import ComicsCharacters from '../comics-characters';
import ComicsHead from '../comics-head';
import { withRouter } from 'react-router-dom';

class Comics extends Component {
    state = {
        activeImage: undefined,
        load: true
    }
    componentDidMount(){
        this.update()
    };
    componentDidUpdate(prevState){
        if (this.state.activeImage !== prevState.activeImage){
            }
    }
    update(){
        const {marvelApi, id, singleItemLoaded, loadded} = this.props;
        loadded();
        marvelApi.getOneComicsBook(id)
            .then((data)=>{
                this.onChangeImage(data.images[0])
                singleItemLoaded(data)})
    };
    

    onChangeImage = (url) => {
        this.setState(()=>{
            return {
            activeImage: url.replace(/portrait_incredible/, 'portrait_uncanny'),
            load:false
        }
    })
}


    render(){
        const {activeItem, marvelApi, history} = this.props;
        if (activeItem !== undefined && activeItem.length !== 0 && activeItem.pageCount){

            const { characters, description, images, pageCount, title, id } = activeItem;

            return (
                <div>
                    <div className='container'>{
                        <ComicsHead description={description} pageCount={pageCount} title={title} activeImage={this.state.activeImage} load={this.state.load}/>}
                        <div className='comics__images'>
                            {
                                images.map((image)=>{
                                    return <ComicsImages image={image} key={`${id}${image}`} onChangeImage={this.onChangeImage}/>
                                })
                            }
                        </div>
                    </div>
                    <div className='comics__characters' >
                            {
                                characters.map((character)=> {
                                    return <ComicsCharacters url={character} marvelApi={marvelApi}  key={`${id}${character}`} onSelectCharacterd={(id) => history.push(`/characters/${id}`)}/>
                                })
                            }
                    </div>
                </div>
            )}
        return <span></span>
        }}



const mapStayToProps = ({activeItem, loading}) => {
    return {
        activeItem,
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


export default withRouter(WithMarvelService(connect(mapStayToProps, mapDispatchToProps)(Comics)))