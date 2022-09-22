import React from 'react';

const Project = ({project, selectedProject, setSelectedProject, checkUpdate, setUpdate}) => {
    const handleDelete = (name) => {
        fetch(`/projects/${name}`, {
            method: 'DELETE',
        })
        .then(() => {
            if (name === selectedProject.name) setSelectedProject({});
            setUpdate(!checkUpdate);
        });
    ;}
    return (
        <div className='project'>
            <button id='deleteProjectBtn' onClick={()=>handleDelete(project.name)}>X</button>
            <button id='projectBtn' onClick={()=>{setSelectedProject(project)}}>{project.name}</button>
        </div>
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
                setUpdate(!checkUpdate);
                return console.log('project added')
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
export { Project, Add };