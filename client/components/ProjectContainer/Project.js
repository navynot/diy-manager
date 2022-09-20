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
        .then(() => {
            setUpdate(!checkUpdate);
        });
    ;}

    return (
            <button id='deleteProjectBtn' onClick={()=>handleDelete(name)}>X</button>
    )
}

const Add = ({setCheckCreate, setCheckAdd, setNewProject, newProject, checkUpdate, setUpdate}) => {
    const handleNameInput = (event) => {
        return setNewProject(event.target.value);
    };

    const handleSubmit = (name) => {
        if (name != '') {
            fetch('/projects/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name : name})
            })
            .then(() => {
                setCheckCreate(false) 
                setCheckAdd(true)
                setNewProject('')
                setUpdate(!checkUpdate);
                return console.log('render triggered')
            });
        }else {
            setCheckCreate(false);
            setCheckAdd(true);
            return console.log('name empty');
        }
    };

    return (
        <div id='projectForm'>
                <input type="text" placeholder='New Project' value={newProject} onChange={(event)=>handleNameInput(event)}/>
                <button id='submitProject' onClick={()=>handleSubmit(newProject)}>Ok</button>
        </div>
    );
};
export { Project, Delete, Add };