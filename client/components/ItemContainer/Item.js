import React from 'react';

export const Item = ({name, cost}) => {
    return (
        <div className='itemWrapper'>
            <div>
                <button id='deleteItem'>x</button>
                <button id='editItem'>edit</button>
                <button id='itemBtn'>{name}</button>
            </div>
            <span id='cost'>{'$' + cost}</span>
        </div>
    )
}