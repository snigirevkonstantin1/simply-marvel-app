import React, { useEffect  } from 'react';
import './paggination.css';
import { WithMarvelService } from '../hoc';
import { connect } from 'react-redux';
import { selectCharacterPage, totalLoaded } from '../../actions';
import { bindActionCreators } from 'redux';
import PaginationListItem from '../paggination-list-item'


const Paggination = ({ selectPage, loading, marvelApi, totalPage, totalLoaded, page }) => {
    useEffect(()=>{
        marvelApi.getApiInfo()
        .then((data)=>{totalLoaded(Math.floor(data/12))}
            )}, [marvelApi, totalLoaded]);

    if (loading){
        return <span></span>
    }
    else{
        console.log(page)
        return(
            <nav aria-label="nav__area">
                <ul className="pagination justify-content-center">
                    <PaginationListItem page={page} totalPage={totalPage} selectPage ={selectPage}/>
                </ul>
            </nav>
            );
        };
    }


const mapStateToProps = ({ page, loading, totalPage }) => {
    return {
        page,
        loading,
        totalPage
    };
};


const mapDispatchToProps = (dispatch) => {
    return{
        selectPage: (pageNumber) => dispatch(selectCharacterPage(pageNumber)),
        totalLoaded: bindActionCreators(totalLoaded, dispatch)
    }
};

export default WithMarvelService(connect(mapStateToProps, mapDispatchToProps)(Paggination))