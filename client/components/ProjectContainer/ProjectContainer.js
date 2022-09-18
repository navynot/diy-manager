import React, { useState } from 'react';
import { Project, Delete } from './Project';
import './ProjectContainer.css';

export const ProjectContainer = ({projects, setSelectedProject, checkUpdate, setUpdate}) => {
    const [checkCreate, setCheckCreate] = useState(false);
    const [checkAdd, setCheckAdd] = useState(true);
    const [newProject, setNewProject] = useState('');

    return (
        <section className='projectContainer'>
            <div className='header'>
                <h3 id='projectHeader'>Projects</h3>
                {checkCreate ? <Form  setCheckCreate={setCheckCreate} setCheckAdd={setCheckAdd} setNewProject={setNewProject} newProject={newProject} checkUpdate={checkUpdate} setUpdate={setUpdate}/> : null}
                {checkAdd ? <button id='addProject' onClick={()=>{setCheckCreate(true), setCheckAdd(false)}}>+</button> : null}
            </div>
            {projects.map(project => {
                return (
                    <div className='project'>
                        <Delete 
                            key={'d' + project._id} 
                            name={project.name}
                            checkUpdate={checkUpdate}
                            setUpdate={setUpdate} 
                        />
                        <Project 
                            key={project._id} 
                            project={project}
                            setSelectedProject={setSelectedProject} 
                        />
                    </div> 
                )
            })}
        </section>
    )
};

const Form = ({setCheckCreate, setCheckAdd, setNewProject, newProject, checkUpdate, setUpdate}) => {
    const handleNameInput = (event) => {
        console.log(event.target.value);
        setNewProject(event.target.value);
    }

    const handleSubmit = (name) => {
        if (name) {
            fetch('/projects/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name : name})
            })
            setCheckCreate(false);
            setCheckAdd(true);
            setNewProject('');
            setUpdate(!checkUpdate);
            return;
        }else {
            setCheckCreate(false);
            setCheckAdd(true);
            return;
        };
    }
    return (
        <form id='projectForm' onSubmit={()=> handleSubmit(newProject)}>
                <input type="text" placeholder='New Project' value={newProject} onChange={(event)=> handleNameInput(event)}/>
                <button type='submit ' id='submitProject'>Ok</button>
        </form>
    )
}