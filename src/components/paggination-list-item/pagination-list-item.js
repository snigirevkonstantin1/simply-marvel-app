import React from 'react';


const renderItem = (func, page, total, content) => {
    if (page > total){
        return (
        <li className="page-item"><span className="page-link" onClick={func}>{content}</span></li>
        )
    }
};


const PaginationListItem = ({page, totalPage, selectPage}) =>{
    return (
        <React.Fragment>
                    {renderItem(()=> selectPage(0), page, 0, 1)}
                    {renderItem(()=> selectPage(page-3), page-3, 1, '...')}
                    {renderItem(()=> selectPage(page-1), page, 1, page)}
                    <li className="page-item active"><span className="page-link" >{(page===totalPage)? totalPage : page+1}</span></li>
                    {renderItem(()=> selectPage(page + 1), totalPage, page+1, page + 2 )}
                    {renderItem(()=> selectPage(page + 4), totalPage, page+4, '...' )}
                    {renderItem(()=> selectPage(totalPage), totalPage, page+2, totalPage )}
        </React.Fragment>
    )
};

export default PaginationListItem