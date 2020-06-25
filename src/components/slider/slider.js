import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import CharacterDetals, {Record}  from '../character-detail';
import { connect } from 'react-redux';


const Slider = (props) => {
    const {id, items, marvelApi, onSelectItem, totalLoading } = props;
    const [activeItemLength, setActiveItemLength] = useState(0);
    
    const params = {
        effect: 'coverflow',
        slidesPerView: 'auto',
        grabCursor: true,
        centeredSlides: true,
        spaceBetween: 30,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },breakpoints: {

            479: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            767: {
              slidesPerView: 3,
              spaceBetween: 40
            }
          }  
      };
      if (items === undefined || items.length === 0){
        return null
      }
      return (
        // <TestPage lengths={totalLoading}/>
        <Swiper {...params}>
        {
        items.map((item)=>{
            return <div key={`${item.name}${id}`}> 
                <CharacterDetals
                item={item}
                marvelApi={marvelApi}
                onSelectItem={onSelectItem}>
                    <Record />
                </CharacterDetals> 
            </div>
        })
    }
    </Swiper>
      )
}
const mapStateToProps = ({totalLoading}) => {
    return { totalLoading };
};

export default connect(mapStateToProps)(Slider)