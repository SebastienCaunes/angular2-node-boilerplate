const mongoose = require('mongoose'),
      Project = mongoose.model('Project'),
      _ = require('lodash');

exports.projectsOfUser = (req, res) => {

    Project.find({ "user": req.user._id })
        .then(projects => {

            if(projects.length > 0) {
                return res.status(200).json(projects);
            }

            return res.status(204).json(projects);
        })
        .catch(err => {
            return res.status(400).json({msg : err.message});
        });
};

exports.project = (req, res) => {

    Project.find({_id: req.params.id})
        .then(project => {
            if(project.length > 0) {
                return res.status(200).json(project);
            }

            return res.status(204).json(project);
        })
        .catch(err => {
            return res.status(400).json({msg : err.message});
        });
};

exports.save = (req, res) => {
    if(_.isEmpty(req.body)) {
        return res.sendStatus(400);
    }

    Project.create(req.body)
        .then(succ => res.sendStatus(201))
        .catch(err => res.status(409).json({ msg: err.message}))
};

exports.update = (req, res) => {

    if(_.isEmpty(req.body)) {
        return res.sendStatus(400);
    }

    Project.update({_id: req.params.id}, req.body)
        .then(succ => res.sendStatus(200))
        .catch(err => res.status(500).json({ msg: err.message}));
};

exports.delete = (req, res) => {

    Project.remove({_id: req.params.id}, { justOne: true })
        .then(succ => res.sendStatus(200))
        .catch(err => res.status(500).json({ msg: err.message}));
};