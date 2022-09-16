const projectModel = require('../model/projectModels');

const projectController = {

    getAllProjects: (req, res, next) => {
        projectModel.find({}, (err, response) => {
            if (err) return next({
                log: 'Express error handler caught error in getAllProjects',
                status: 500,
                message: {err: err.message}
            });

            res.locals.projects = response;
            console.log('found projects');
            return next();
        });
    },

    createProject: ( req, res, next) => {
            const { name } = req.body;

            projectModel.create({name: name}, (err, response) => {
                if (err) return next({
                    log: 'Express error handler caught error in createProject',
                    status: 500,
                    message: {err: err.message}
                });

                console.log('project successfully created');
                res.locals.project = response;
                return next();
            });
    },

    getDetails: (req, res, next) => {
   
        const { name } = req.params;

        projectModel.findOne({name: name}, (err, projectInfo) => {
            if (projectInfo === null) return next({
                log: 'Express error handler caught error in getDetails',
                status: 500,
                message: {err: err}
            });

            console.log('received project details');
            console.log(projectInfo);
            res.locals.name = projectInfo.name;
            res.locals.items = projectInfo.items;
            return next();
        });
    },

    addItem: (req, res, next) => {
        const { name } = req.params;
        const { items } = req.body;

        projectModel.findOneAndUpdate({name: name}, {items: items}, {new: true}, (err, response) => {
            if (err) return next({
                log: 'Express error handler caught error in addItem',
                status: 500,
                message: {err: err.message}
            })
            console.log('updated project items');
            res.locals.project = response;
            return next();
        })
    }
}

module.exports = projectController;