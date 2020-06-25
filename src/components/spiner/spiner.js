import React from 'react';
import './spiner.css'


const Spiner = () => {
    return(
        <div className="text-center customSpinner">
            <div className="spinner-border h-100" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Spiner;