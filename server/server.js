const express = require('express');
const path = require('path');

const app = express();


const projectController = require('./controller/projectController');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/projects', projectController.getAllProjects, (req, res) => {
    return res.status(200).json(res.locals.projects);
});

app.get('/projects/:name', projectController.getItems, (req, res) => {
    return res.status(200).json(res.locals);
});

app.post('/projects/create', projectController.createProject, (req, res) => {
    return res.status(200).redirect('/');
});

app.patch('/projects/:name', projectController.addItem, (req, res) => {
    return res.status(200).redirect(`/projects/${req.params.name}`);
})

app.delete('/projects/:name', projectController.deleteObjects, (req, res) => {
    if (res.locals.query === 'item') return res.status(200).redirect(`/projects/${req.params.name}`);
    return res.status(200).redirect('/');
})

//catch all route handler
app.use((req, res) => res.status(404).send('This page does not exist'));

//global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: {err: 'An error occured'}
    };
    const errObj = Object.assign(defaultErr, err);
    console.log(errObj.log);
    return res.status(errObj.status).json(errObj.message);
})

app.listen(3000);

module.exports = app;