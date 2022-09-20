import React, { useState, useEffect } from 'react';
import { ProjectContainer } from './ProjectContainer/ProjectContainer';
import { ItemContainer } from './ItemContainer/ItemContainer';
import '../index.css';

export const App = () => {

    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState({});
    const [checkUpdate, setUpdate] = useState(false);

    useEffect(() => { 
            fetch('/projects')
                .then(res => res.json())
                .then(projs => projs.forEach(proj => setProjects(state => [...state, proj])));
        return () => {
            setProjects([]);
        };
    }, [checkUpdate]);

    console.log('projects', projects);
    
    return (
        <div className='appContainer'>
            <ProjectContainer 
                projects={projects} 
                setSelectedProject={setSelectedProject} 
                checkUpdate={checkUpdate}
                setUpdate={setUpdate}
            />
            <ItemContainer 
                project={selectedProject}
                checkUpdate={checkUpdate}
                setUpdate={setUpdate}
            />
        </div>
    )
}
