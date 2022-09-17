import React from 'react';

const Project = ({name, items}) => {
    return (
        <div>
            <a href={`/projects/${name}`}>{name}</a>
        </div>
    )
}

export default Project;