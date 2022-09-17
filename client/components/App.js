import React, { useState, useEffect } from 'react';
import ProjectsContainer from './Projects/ProjectsContainer';

export const App = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('/projects')
            .then(res => res.json())
            .then(projs => {
                projs.forEach(proj => setProjects(state => [...state, proj]));
            });
    }, [])
    
    return (
        <div>
           <ProjectsContainer projects={projects}/>
        </div>
    )
}