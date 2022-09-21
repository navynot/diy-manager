import React, { useState, useEffect } from 'react';
import { Item } from './Item';
import './ItemContainer.css';

export const ItemContainer = ({project}) => {
    const [checkCreate, setCheckCreate] = useState(false);
    const [checkAdd, setCheckAdd] = useState(true);
    const [checkUpdate, setUpdate] = useState(false);
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [newCost, setNewCost] = useState(0);

    useEffect(() => {
            console.log('effect triggered');
            fetch(`/projects/${project.name}`)
                .then(res => res.json())
                .then(proj => {
                    proj.items.forEach(item => setItems(state => [...state, item]));
                    console.log('items fetched from effect trigger', proj.items);
                })
            return () => {
                console.log('unmount');
                setItems([]);
                setCheckCreate(false);
                setCheckAdd(true);
                setNewItem('');
                setNewCost(0);
            };
        }, [checkUpdate, project]);

    console.log('mount/render');
    console.log('mount/render items', items);
 
    return (
        <div className='wrapper'>
            <section className='itemContainer'>
                <div className='header'>
                    <h3 id='projectHeader'>{project.name}</h3>
                    {project.name && checkAdd ? <button id='addItem' onClick={()=> {setCheckCreate(true), setCheckAdd(false)}}>+Item</button> : null}
                </div>
                {project.name ? items.map(item => <Item key={item._id} name={item.name} cost={item.cost}/>) : null}
            </section>
            <section className='popupWrapper'>
               {checkCreate ?  
                    <Form 
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

const Form = ({newItem, setNewItem, newCost, setNewCost, setCheckCreate, setCheckAdd, projectName, checkUpdate, setUpdate}) => {

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