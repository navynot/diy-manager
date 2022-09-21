import React, { useState, useEffect } from 'react';
import { ProjectContainer } from './ProjectContainer/ProjectContainer';
import { ItemContainer } from './ItemContainer/ItemContainer';
import '../index.css';

export const App = () => {
    const [selectedProject, setSelectedProject] = useState({});
    
    return (
        <div className='appContainer'>
            <ProjectContainer selectedProject={selectedProject} setSelectedProject={setSelectedProject}/>
            {selectedProject.name ? <ItemContainer project={selectedProject}/> : null }
        </div>
    )
}
