const express = require('express');
const User = require('../models/userModel');
const data = require('../data');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils');

const userRouter = express.Router();

userRouter.post('/seed', async (req, res) => {
  const createdUsers = await User.insertMany(data.users);

  res.status(200).json({
    status: 'success',
    message: 'Seed users success!',
    data: createdUsers,
  });
});

userRouter.get('/', async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    message: 'Query all users success!',
    data: users,
  });
});

userRouter.post('/signin', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const response = {
        _id: user._id,
        name: user.name,
        email: user.email,
        best_score: user.best_score,
        token: generateToken(user),
      };

      res.status(200).json({
        status: 'success',
        message: 'Sign in success!',
        data: response,
      });

      return;
    } else {
      res.status(401).send({
        status: 'error',
        message: 'Email and password does not match',
        data: null,
      });
    }
  } else {
    res.status(401).send({
      status: 'error',
      message: 'Invalid email or password',
      data: null,
    });
  }
});

userRouter.post('/signup', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  const createdUser = await user.save().catch((err) =>
    res.status(401).send({
      status: 'error',
      message: err,
      data: null,
    })
  );

  if (createdUser) {
    res.status(200).send({
      status: 'success',
      message: 'Sign up success!',
      data: {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        best_score: createdUser.best_score,
        token: generateToken(user),
      },
    });
  }
});

userRouter.get('/global-best', async (req, res) => {
  const users = await User.findOne({ best_score: { $gte: 12 } })
    .sort('best_score')
    .exec();

  res.status(200).send({
    status: 'success',
    message: 'Query best score success!',
    data: users,
  });
});

userRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    message: 'Update best score success',
    data: user,
  });
});

userRouter.put('/my-best/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user.best_score > req.body.best_score) {
    const updateScore = {
      $set: {
        best_score: req.body.best_score,
      },
    };

    await User.updateOne({ _id: req.params.id }, updateScore);
  }

  res.status(200).json({
    status: 'success',
    message: 'Update best score success',
    data: {
      best_score:
        user.best_score > req.body.best_score
          ? req.body.best_score
          : user.best_score,
    },
  });
});

module.exports = userRouter;
