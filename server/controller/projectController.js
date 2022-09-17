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
                    message: {err: err}
                });

                console.log('project successfully created');
                res.locals.project = response;
                return next();
            });
    },

    deleteObject: (req, res, next) => {
        const { name } = req.params;
        const { item } = req.query;

        if (item) {
            projectModel.findOne({name: name}, (err, project) => {
                const newItems = project.items.filter(el => el.name != item);
                project.items = newItems;
                project.save();
                console.log('item deleted');
                res.locals.query = 'item';
                return next();
            })
        }
        else {
            projectModel.findOneAndDelete({name: name}, (err, deleted) => {
                if (deleted === null) return next({
                    log: 'Express error handler caught error in deleteProject',
                    status: 500,
                    message: {err: err}
                })
                res.locals.query = 'project';
                return next();
            })
        }
    },

    getItems: (req, res, next) => {
   
        const { name } = req.params;

        projectModel.findOne({name: name}, (err, projectInfo) => {
            if (projectInfo === null) return next({
                log: 'Express error handler caught error in getDetails',
                status: 500,
                message: {err: err}
            });

            res.locals.name = projectInfo.name;
            res.locals.items = projectInfo.items;
            return next();
        });
    },

    addItem: (req, res, next) => {
        const { name } = req.params;
        const { item } = req.body;

        projectModel.findOne({name: name}, (err, project) => {
            project.items.push(item);
            project.save();
        })
        return next();
    },
}

module.exports = projectController;