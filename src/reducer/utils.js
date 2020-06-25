const arraySetVisibility = (arr, id) => {
    const item = arr.find((elem)=>elem.id === id);
    const findIndex = arr.findIndex((elem)=>elem.id === id);
    item.visibility = !(item.visibility);
    return [
        ...arr.slice(0, findIndex),
        item,
        ...arr.slice(findIndex+1)
    ]
}


export { arraySetVisibility };