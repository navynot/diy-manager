import React from 'react';

const Item = ({itemName, cost, projectName, checkUpdate, setUpdate, newName, newCost, setNewName, setNewCost}) => {
    const handleDelete = (itemName) => {
        fetch(`/projects/${projectName}?item=${itemName}`, {
            method: 'DELETE'
        })
        .then(()=> {
            setUpdate(!checkUpdate);
            console.log('delete button triggered');
        })
    }
    return (
        <div className='itemWrapper'>
            <div>
                <button id='deleteItem' onClick={()=>handleDelete(itemName)}>x</button>
                <button id='editItem' onClick={()=>console.log('edit clicked')}>edit</button>
                <button id='itemBtn'>{itemName}</button>
            </div>
            <span id='cost'>{'$' + cost}</span>
        </div>
    )
}

const Add = ({newItem, setNewItem, newCost, setNewCost, setCheckCreate, setCheckAdd, projectName, checkUpdate, setUpdate}) => {

    const handleNameInput = (event) => {
        return setNewItem(event.target.value);
    }

    const handleCostInput = (event) => {
        return setNewCost(event.target.value);
    }

    const handleSubmit = (projectName, name, cost) => {
        if (name && cost) {
                fetch(`/projects/${projectName}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({item: {name: name, cost: cost}})
            })
            .then (() => {
                setTimeout(setUpdate(!checkUpdate), 10000);
                console.log('submit triggered');
            })
        }else {
            setCheckCreate(false);
            setCheckAdd(true);
            return console.log('empty input(s)');
        }
    }

    return (
        <div id='itemForm'>
            <input id='itemName' type='text' placeholder='Name' value={newItem} onChange={(event)=>handleNameInput(event)}/>
            <input id='itemCost' type='number' placeholder='Cost' value={newCost} onChange={(event)=>handleCostInput(event)}/>
            <button id='submitItem' onClick={()=>handleSubmit(projectName, newItem, newCost)}>Add</button>
        </div>
    )
}

export { Item, Add };