const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// @route   GET api/courses
// @desc    Get all courses 
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const courses = await Course.find().sort({name: -1});
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
})

// @route   POST api/courses
// @desc    Create a course
// @access  Private
router.post('/', [auth, [
    check('name', 'Please enter a name').not().isEmpty(),
    check('par', 'Please enter the course par').not().isEmpty(),
    check('holePar', 'Please enter the individual hole par').not().isEmpty(),
    check('holeMeters', 'Please enter the distance for each hole').not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const { name, par, holePar, holeMeters } = req.body;
    try {
        const newCourse = new Course({
            name,
            par,
            holePar,
            holeMeters
        });

        const course = await newCourse.save();

        res.json(course);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');
    }
})

// @route   PUT api/courses
// @desc    Update a course
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { name, par, holePar, holeMeters } = req.body;

    // Build contact object 
    const courseFields = {};
    if(name) courseFields.name = name
    if(par) courseFields.par = par
    if(holePar) courseFields.holePar = holePar
    if(holeMeters) courseFields.holeMeters = holeMeters

    try {
        let course = await Course.findById(req.params.id);

        if(!course){
            return res.status(404).json({ msg: 'Course not found'});
        }

        course = await Course.findByIdAndUpdate(req.params.id, {$set: courseFields}, {new: true});
    
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   DELETE api/courses
// @desc    Delete a course
// @access  Private
router.delete('/:id', auth, async(req, res) => {
    try {
        let course = await Course.findById(req.params.id)

        if(!course){
            return res.status(404).json({ msg: 'Course not found' })
        }

        await Course.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Course removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;