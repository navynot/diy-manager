import React, { useState } from 'react';
import { Project, Delete, Add } from './Project';
import './ProjectContainer.css';

export const ProjectContainer = ({projects, setSelectedProject, checkUpdate, setUpdate}) => {
    const [checkCreate, setCheckCreate] = useState(false);
    const [checkAdd, setCheckAdd] = useState(true);
    const [newProject, setNewProject] = useState('');

    return (
        <section className='projectContainer'>
            <div className='header'>
                <h3 id='projectHeader'>Projects</h3>
                {checkCreate ? <Add  setCheckCreate={setCheckCreate} setCheckAdd={setCheckAdd} setNewProject={setNewProject} newProject={newProject} checkUpdate={checkUpdate} setUpdate={setUpdate}/> : null}
                {checkAdd ? <button id='addProject' onClick={()=>{setCheckCreate(true), setCheckAdd(false)}}>+</button> : null}
            </div>
            {projects.map(project => {
                return (
                    <div className='project'>
                        <Delete 
                            key={'deleted' + project._id} 
                            name={project.name}
                            checkUpdate={checkUpdate}
                            setUpdate={setUpdate} 
                        />
                        <Project 
                            key={project._id} 
                            project={project}
                            setSelectedProject={setSelectedProject}
                            checkUpdate={checkUpdate}
                            setUpdate={setUpdate}
                        />
                    </div> 
                )
            })}
        </section>
    )
};
