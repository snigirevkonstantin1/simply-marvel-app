import CryptoJS from 'crypto-js';
import { YOUR_PUBLIC_KEY, YOUR_PRIVATE_KEY } from './key'
//http://i.annihil.us/u/prod/marvel/i/mg/1/b0/5269678709fb7/portrait_uncanny.jpg

export default class MarvelApiService {
    _baseUrl = `https://gateway.marvel.com/v1/public/`;
    _md5Hash = `${CryptoJS.MD5(`1${YOUR_PRIVATE_KEY}${YOUR_PUBLIC_KEY}`).toString()}`;
    _urlParams = `?ts=1&apikey=${YOUR_PUBLIC_KEY}&hash=${this._md5Hash}`;
    _itemPerPage = 12;
    _defaultImage = 'https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_incredible.jpg'


    async getResource(direction, offsetCount){
        const response = await fetch(`${this._baseUrl}${direction}${this._urlParams}&limit=12&offset=${offsetCount}`);
        if(!response.ok){
          throw new Error (`Cant connect this service ${response.status}`);
        };
        const textResponse = await response.json();
        return textResponse.data;
      };

      getImage = (url) => {
        return (url==null)? this._defaultImage: `${url.path}/portrait_incredible.${url.extension}`;
      };

      async getSingleItem(direction, id){
        const response = await fetch (`${this._baseUrl}${direction}/${id}${this._urlParams}`);
        const textResponse = await response.json();
        return textResponse.data;
      };

    getResourceUrlTarget = async(url) => {
      const newUrl = this._toHttps(url)
      const response = await fetch(`${newUrl}${this._urlParams}`)
      const textResponse = await response.json();
      return textResponse.data;
    }

    getComicsCharacter = async(url) => {
      const res = await this.getResourceUrlTarget(url);
      return this._toPrettyComicsCharacter(res.results[0]);
    }

    getAllCharacters = async(count) => {
        const res = await this.getResource('characters', count * this._itemPerPage);
        return res.results.map(this._toPrettyCharacter);
      };


    getOneCharacter = async(id) => {
      const res = await this.getSingleItem('characters', id);
      return this._toPrettyCharacter(res.results[0])
    }

    getOneComicsBook = async(id) => {
      const res = await this.getSingleItem('comics', id);
      return this._toPrettyComicsBook(res.results[0])
    }
  

    getOneEvent = async(url)=> {
      try{
        const newUrl = this._toHttps(url)
        const response = await fetch(`${newUrl}?ts=1&apikey=${YOUR_PUBLIC_KEY}&hash=${this._md5Hash}`);
        const textResponse = await response.json();
        return this._toPrettyEvent(textResponse.data.results[0]);}
      catch(err) {
        return this._toPrettyEvent({
          title: 'information coming soon',
          image: null,
          description: 'information coming soon'
        })
      }
    }


    getApiInfo =  async() => {
      const res = await this.getResource('characters', 1);
      return res.total
    };
    
    _toHttps = (url) => {
      const re = /^(http)/
      return url.replace(re, 'https')
    }
    _toPrettyEvent = ({id, title, thumbnail, description}) => {
      const descriptionSize =  (description != null)?description.split(' ').length : 0;
      return {
        id,
        title,
        description: (descriptionSize > 20 && description)?`${description.split(' ').slice(0, 20).join(' ')} ...`: description,
        images: this.getImage(thumbnail)
      }
    };
    _toPrettyComicsBook = ({id, images, characters, pageCount, description, title}) => {
      return{
        id,
        title,
        description: !(description === '')? description : 'The description is not ready yet .. Maybe it will be later',
        pageCount: (pageCount === 0)? 'The description is not ready yet .. Maybe it will be later': pageCount,
        characters: characters.items.map((item)=>item.resourceURI),
        images: images.map((image)=>this.getImage(image))
    }
  }
  _toPrettyComicsCharacter = ({id, name, thumbnail}) => {
    return {
      id,
      name,
      image: this.getImage(thumbnail)
    }
  }

    _toPrettyCharacter = ({ name, description, id, thumbnail, comics,  events, series, stories}) => {
      return {
        id,
        name,
        comics: comics.items,
        events: events.items,
        series: series.items,
        stories: stories.items,
        description: !(description === '')? description : 'The description is not ready yet .. Maybe it will be later',
        image: this.getImage(thumbnail)
      };
    };
};