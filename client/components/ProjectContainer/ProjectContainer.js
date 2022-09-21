import React, { useState, useEffect } from 'react';
import { Project, Delete, Add } from './Project';
import './ProjectContainer.css';

export const ProjectContainer = ({selectedProject, setSelectedProject}) => {
    const [projects, setProjects] = useState([]);
    const [checkUpdate, setUpdate] = useState(false);
    const [checkCreate, setCheckCreate] = useState(false);
    const [checkAdd, setCheckAdd] = useState(true);
    const [newProject, setNewProject] = useState('');

    useEffect(() => { 
        fetch('/projects')
            .then(res => res.json())
            .then(projs => projs.forEach(proj => setProjects(state => [...state, proj])));
        return () => {
            setProjects([]);
            setCheckCreate(false);
            setCheckAdd(true);
            setNewProject('');
        };
    }, [checkUpdate]);

    return (
        <section className='projectContainer'>
            <div className='header'>
                <h3 id='projectHeader'>Projects</h3>
                {checkCreate ? <Add  setNewProject={setNewProject} newProject={newProject} checkUpdate={checkUpdate} setUpdate={setUpdate}/> : null}
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
                            selectedProject={selectedProject}
                            setSelectedProject={setSelectedProject}
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
