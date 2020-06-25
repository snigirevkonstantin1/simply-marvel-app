import {arraySetVisibility} from './utils'


const initialState = {
    characters: [],
    loading: true,
    page: 0,
    totalPage: 0,
    activeItem: [],
    error: null,
    totalLoading: 0
}

const reducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type){
        case 'LOADING': 
            return{
                ...state,
                loading: true
            };
        case 'ALL_CHARACTERS_LOADED':
            return {
                ...state,
                characters: action.payload,
                loading: false
            };
        case 'REQUEST_ERROR':
            return {
                characters: [],
                loading: false,
                page: 0,
                totalPage: 0,
                activeItem: [],
                error: action.payload
            };
        case 'SELECTPAGE': 
            return {
                ...state,
                page: action.payload
            };
        case 'TOTALLOAD':
            return {
                ...state,
                totalLoading: state.totalLoading +=1
            };
        case 'TOTALPAGE':
            return {
                ...state,
                totalPage: action.payload
            };
        case 'SHOWCHARACTERINFORMATION':
            return {
                ...state,
                characters: arraySetVisibility(state.characters, action.payload)
            };
        case 'SINGLE_ITEM_LOADING':
            return {
                ...state,
                activeItem: action.payload,
                loading: false
            }
        case 'SINGLEITEMCLEAR':
            return {
                ...state,
                loading: true,
                activeItem: []
            }
        default:
            return state
    }
};
// const updateAllCharacters = (state, action) => {
//     switch (action.type) {
//         case 'LOADING': 
//         console.log(state.loading)
//             return{
//                 ...state,
//                 loading: true
//             };
//         case 'ALL_CHARACTERS_LOADED':
//             return {
//                 ...state,
//                 characters: action.payload,
//                 loading: false
//             };
//         case 'REQUEST_ERROR':
//             return {
//                 characters: [],
//                 loading: false,
//                 page: 0,
//                 totalPage: 0,
//                 activeItem: [],
//                 error: action.payload
//             };
//         case 'SELECTPAGE': 
//             return {
//                 ...state,
//                 page: action.payload
//             };

//         case 'TOTALPAGE':
//             return {
//                 ...state,
//                 totalPage: action.payload
//             };
//     }
// }


export default reducer;