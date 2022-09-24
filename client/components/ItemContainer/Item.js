import React from 'react';

const Item = ({itemName, cost, projectName, checkUpdate, setUpdate, setCheckCreate, setSelectedItem, setSelectedCost}) => {
    const handleDelete = (itemName) => {
        fetch(`/projects/${projectName}?item=${itemName}`, {
            method: 'DELETE'
        })
        .then(()=> {
            setUpdate(!checkUpdate);
            console.log('delete button triggered');
        })
    }

    const handleEdit = (itemName) => {
        setSelectedItem(itemName);
        setSelectedCost(cost);
        setCheckCreate(true);
    }
    return (
        <div className='itemWrapper'>
            <div className='actions'>
                <button id='deleteItem' onClick={()=>handleDelete(itemName)}>x</button>
                {/* <button id='editItem' onClick={()=>handleEdit(itemName)}>edit</button> */}
                <button id='itemBtn'>{itemName}</button>
            </div>
            <div id='cost'>{'$' + cost}</div>
        </div>
    )
}

const Add = ({newItem, setNewItem, newCost, setNewCost, setCheckCreate, setCheckAdd, projectName, checkUpdate, setUpdate, selectedItem, selectedCost}) => {

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
                setUpdate(!checkUpdate);
            })
        }else {
            setCheckCreate(false);
            setCheckAdd(true);
            return console.log('empty input(s)');
        }
    }

    const handleEdit = (projectName, itemName, newName, newCost) => {
        if (newName || newCost) {
            fetch(`/projects/${projectName}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({item: {oldName: itemName, newName: newName, newCost: newCost}})
            })
            .then(() => {
                setUpdate(!checkUpdate);
            })
        }else {
            setCheckCreate(false)
            setCheckAdd(true);
            return console.log('empty input(s)');
        }
    }

    if (selectedItem) {
        return (
            <div id='itemForm'>
            <input id='itemName' type='text' placeholder={selectedItem} value={newItem} onChange={(event)=>handleNameInput(event)}/>
            <input id='itemCost' type='number' placeholder={'$' + selectedCost} value={newCost} onChange={(event)=>handleCostInput(event)}/>
            <button id='submitItem' onClick={()=>handleEdit(projectName, selectedItem, newItem, newCost)}>Apply Changes</button>
        </div>
        )
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