import React from 'react';
import Project from './Project';

const ProjectsContainer = ({projects}) => {

    const projectsList = [];

    projects.forEach(project => {
        projectsList.push(<Project key={project._id} name={project.name} items={project.items}/>)
    })

    return (
        <div>
            {projectsList}
        </div>
    )
}

export default ProjectsContainer;