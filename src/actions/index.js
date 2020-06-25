const charactersLoaded = (characters) => {
    return {
        type: 'ALL_CHARACTERS_LOADED',
        payload: characters
    }
};

const loadded = () => {
    return {
        type: 'LOADING'
    }
};


const totalLoad = () => {
    return {
        type: 'TOTALLOAD'
    }
}

const selectCharacterPage = (pageNumber) => {
    return{
        type: 'SELECTPAGE',
        payload: pageNumber
    }
}

const totalLoaded = (count) => {
    return{
        type: 'TOTALPAGE',
        payload: count
    }
}

const showMoreCharacterInformation = (id) => {
    return {
        type: 'SHOWCHARACTERINFORMATION',
        payload: id
    }
}

const singleItemLoaded = (item) => {
    return {
        type: 'SINGLE_ITEM_LOADING',
        payload: item
    }
}

const singleItemClear = () => {
    return {
        type: 'SINGLEITEMCLEAR'
    }
}
const requestError = (err) => {
    return {
        type: 'REQUEST_ERROR',
        payload: err
    }
}

export {
    charactersLoaded,
    loadded,
    selectCharacterPage,
    totalLoaded,
    showMoreCharacterInformation,
    singleItemLoaded,
    singleItemClear,
    requestError,
    totalLoad
};