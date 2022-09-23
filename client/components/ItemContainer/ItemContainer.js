import React, { useState, useEffect } from 'react';
import { Item, Add } from './Item';
import './ItemContainer.css';

export const ItemContainer = ({project}) => {
    const [checkCreate, setCheckCreate] = useState(false);
    const [checkAdd, setCheckAdd] = useState(true);
    const [checkUpdate, setUpdate] = useState(false);
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [newCost, setNewCost] = useState(0);
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedCost, setSelectedCost] = useState(0);

    useEffect(() => {
            fetch(`/projects/${project.name}`)
                .then(res => res.json())
                .then(proj => {
                    proj.items.forEach(item => setItems(state => [...state, item]));
                })
            return () => {
                setItems([]);
                setCheckCreate(false);
                setCheckAdd(true);
                setNewItem('');
                setNewCost(0);
                setSelectedItem('');
                setSelectedCost(0);
            };
        }, [checkUpdate, project]);
 
    return (
        <div className='wrapper'>
            <section className='itemContainer'>
                <div className='header'>
                    <h3 id='projectHeader'>{project.name}</h3>
                    {project.name && checkAdd ? 
                        <button id='addItem' onClick={()=> {setCheckCreate(true), setCheckAdd(false)}}>+Item</button> : 
                        <button id='addItem' onClick={()=>(setCheckCreate(false), setCheckAdd(true))}>+Item</button>}
                </div>
                {project.name ? items.map(item => 
                    <Item 
                        key={item._id} 
                        itemName={item.name} 
                        cost={item.cost} 
                        projectName={project.name} 
                        checkUpdate={checkUpdate}
                        setUpdate={setUpdate}
                        setCheckCreate={setCheckCreate}
                        setSelectedItem={setSelectedItem} 
                        setSelectedCost={setSelectedCost}
                    />) : null}
            </section>
            <section className='popupWrapper'>
               {checkCreate ?  
                    <Add 
                        newItem={newItem} 
                        setNewItem={setNewItem} 
                        newCost={newCost} 
                        setNewCost={setNewCost} 
                        setCheckCreate={setCheckCreate} 
                        setCheckAdd={setCheckAdd}
                        checkUpdate={checkUpdate}
                        setUpdate={setUpdate}
                        projectName={project.name}
                        selectedItem={selectedItem}
                        selectedCost={selectedCost}
                    /> : null }
            </section>
        </div>
    )
}

