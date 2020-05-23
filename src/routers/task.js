const express = require('express');
const Tasks = require('../models/task.js');
const auth = require('../middleware/auth.js');
const router = new express.Router();

router.post('/tasks', auth, async (req,res) => {

    // const task = new Tasks(req.body);
    const task = new Tasks({
        ...req.body,
        owner : req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }

});

// GET /tasks
// GET /task?limit=10&skip=20
// GET /task?sortBy=createdAt:asc or desc
router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};
    
    if(req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path : 'tasks',
            match,
            options : {
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort
            },
        }).execPopulate();
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }

});

router.get('/tasks/:id', auth,  async (req,res) => {
    const _id = req.params.id;

    try {
        const task = await Tasks.findOne({ _id, owner : req.user._id  }); 

        if(!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch(e) {
        res.status(500).send();
    }

});

router.patch('/tasks/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if(!isValidOperation) {
        res.status(400).send({error : "Invalid update for tasks . Please recheck again"});
    }

    try {
        const task = await Tasks.findOne({ _id : req.params.id , owner : req.user._id });
        
        if(!task) {
            return res.status(404).send();
        } 

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }

});

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Tasks.findOneAndDelete({ _id : req.params.id, owner : req.user._id});
        if(!task) {
            return res.status(404).send({error : 'task not found'});
        }
        res.send(task);
    } catch(e) {
        res.status(500).send(e);
    } 
});

module.exports = router;