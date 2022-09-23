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
                console.log('project created');
                res.locals.response = response;
                return next();
            });
    },

    deleteObject: async (req, res, next) => {
        const { name } = req.params;
        const { item } = req.query;
        try{
            if (item) {
                const project = await projectModel.findOne({name: name});
                
                const filterandDelete = (proj) => {
                    const newItems = proj.items.filter(el => el.name != item);
                    proj.items = newItems;
                    return proj.save();
                }
                
                await filterandDelete(project);
    
                console.log('item deletd');
                res.locals.query ='item';
                return next();
            }
            else {
                projectModel.findOneAndDelete({name: name}, (err, deleted) => {
                    if (deleted === null) return next({
                        log: 'Express error handler caught error in deleteProject',
                        status: 500,
                        message: {err: err}
                    })
                    console.log('deleted project');
                    res.locals.query = 'project';
                    return next();
                })
            }
        }
        catch (err) {
            return next({
                log: 'Express error handler caught error in deleteItems',
                status: 500,
                message: {err: err}
            })
        }
    },

    getItems: (req, res, next) => {
   
        const { name } = req.params;

        projectModel.findOne({name: name}, (err, projectInfo) => {
            if (projectInfo === null) return next({
                log: 'Express error handler caught error in getItems',
                status: 500,
                message: {err: err}
            });

            res.locals.name = projectInfo.name;
            res.locals.items = projectInfo.items;
            console.log('found items');
            return next();
        });
    },

    addItem: async (req, res, next) => {
        const { name } = req.params;
        const { item } = req.body;

        try {
            if ( item.oldName ) {
                
                return next();
            }else {
                const project = await projectModel.findOne({name: name});
    
                project.items.push(item);
                project.save();
    
                return next();
            }
        }
        catch (err) {return next({
            log: 'Express error handler caught error in addItem',
                status: 500,
                message: {err: 'could not add/edit item'}
        });
        }
    },
}

module.exports = projectController;