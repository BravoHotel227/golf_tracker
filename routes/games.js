const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const Game = require('../models/Game');
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// @route   GET api/games
// @desc    Get all games
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const games = await Game.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(games);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/games
// @desc    Create a game
// @access  Private
router.post(
  '/',
  [auth, [check('stroke', 'Please add strokes to each hole').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { course, stroke } = req.body;
    const qry = { name: course };
    const courseId = await Course.find(qry);
    if (courseId === []) {
      res.status(404).json({ msg: 'No course found' });
    }
    try {
      const newGame = new Game({
        user: req.user.id,
        course,
        stroke,
      });

      const game = await newGame.save();
      res.json(game);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/games/:id
// @desc    update game
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, stroke } = req.body;

  // Build contact object
  const gameFields = {};
  if (name) {
    const course = await Course.find({ name });
    if (!course) {
      res.status(404).json({ msg: 'No course found' });
    }
    gameFields.course = course[0].id;
  }
  if (stroke) gameFields.stroke = stroke;
  try {
    let game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ msg: 'Game not found' });
    }

    game = await Game.findByIdAndUpdate(
      req.params.id,
      { $set: gameFields },
      { new: true }
    );

    res.json(game);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/games/:id
// @desc    Delete game
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ msg: 'Game not found' });
    }

    await Game.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Game removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
