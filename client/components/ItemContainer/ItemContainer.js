import React, { useState, useEffect } from 'react';
import { Item } from './Item';
import './ItemContainer.css';

export const ItemContainer = ({project, checkUpdate, setUpdate}) => {
    const [items, setItems] = useState([])
    const [newItem, setNewItem] = useState('');
    const [newCost, setNewCost] = useState(0);
    const [checkCreate, setCheckCreate] = useState(false);
    const [checkAdd, setCheckAdd] = useState(true);

    useEffect(() => {
        setItems([]);
        fetch(`/projects/${project.name}`)
            .then(response => response.json())
            .then(proj=> {
                proj.items.forEach(item => setItems(state => [...state, item]))
            })
    }, [project]);

    return (
        <div className='wrapper'>
            <section className='itemContainer'>
                <div className='header'>
                    <h3 id='projectHeader'>{project.name}</h3>
                    {project.name && checkAdd ? <button id='addItem' onClick={()=> {setCheckCreate(true), setCheckAdd(false)}}>+Item</button> : null}
                </div>
                {items.map(item => {
                    return (<Item key={item._id} name={item.name} cost={item.cost}/>)
                })}
            </section>
            <section className='popupWrapper'>
               {checkCreate ?  
                    <Form 
                        setItems={setItems} 
                        newItem={newItem} 
                        setNewItem={setNewItem} 
                        newCost={newCost} 
                        setNewCost={setNewCost} 
                        setCheckCreate={setCheckCreate} 
                        setCheckAdd={setCheckAdd}
                        checkUpdate={checkUpdate}
                        setUpdate={setUpdate}
                        projectName={project.name}
                    /> : null }
            </section>
        </div>
    )
}

const Form = ({setItems, newItem, setNewItem, newCost, setNewCost, setCheckCreate, setCheckAdd, projectName, checkUpdate, setUpdate}) => {

    const handleNameInput = (event) => {
        setNewItem(event.target.value);
    }

    const handleCostInput = (event) => {
        setNewCost(event.target.value);
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
            setCheckCreate(false);
            setCheckAdd(true);
            setNewItem('');
            setNewCost(0);
            return;
        }
        return (setCheckCreate(false), setCheckAdd(true));
        }

    return (
        <form id='itemForm'>
            <input id='itemName' type='text' placeholder='Name' value={newItem} onChange={(event)=>handleNameInput(event)}/>
            <input id='itemCost' type='number' placeholder='Cost' value={newCost} onChange={(event)=>handleCostInput(event)}/>
            <button id='submitItem' onClick={()=>handleSubmit(projectName, newItem, newCost)}>Add</button>
        </form>
    )
}