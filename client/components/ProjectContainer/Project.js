import React from 'react';

const Project = ({project, setSelectedProject, checkUpdate, setUpdate}) => {
    return (
            <button id='projectBtn' onClick={()=>{setSelectedProject(project)}}>{project.name}</button>
    )
}

const Delete = ({name, checkUpdate, setUpdate}) => {
    const handleDelete = (name) => {
        fetch(`/projects/${name}`, {
            method: 'DELETE',
        })
        setUpdate(!checkUpdate);
    }
    return (
            <button id='deleteProjectBtn' onClick={()=>handleDelete(name)}>X</button>
    )
}
export { Project, Delete };