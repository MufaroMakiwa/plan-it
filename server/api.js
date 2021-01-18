/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Task = require("./models/task");
const Friend = require("./models/friend");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);

router.get("/whoami", (req, res) => {
  console.log(req.user)
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  res.send(req.user);
});


router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.post("/tasks/create", (req,res) => {
  const newTask = new Task({
    task_name: req.body.task_name,
    userId: req.body.userId,
    userName: req.body.userName,
    created: req.body.created,
    duration: req.body.duration,
    frequency: req.body.frequency,
    is_completed: req.body.is_completed,
    date_completed: req.body.date_completed,
    progress: req.body.progress,
    is_challenge: req.body.is_challenge,
    challenger: req.body.challenger,
    is_accepted: req.body.is_accepted
  });

  newTask.save().then((task) => {
    res.send(task);
  });
});


router.get("/tasks/current", (req, res) => {
  const query = {
    userId: req.query.userId,
    is_completed: false
  }
  Task.find(query).then((tasks) => {
    res.send(tasks)
  })
});


router.post("/tasks/delete", (req, res) => {
  Task.deleteOne({ _id:  req.body._id }).then((task) => res.send(task))
})


router.post("/tasks/update", (req, res) => {
  Task.findOne({_id: req.body._id}).then((task) => {
    task.progress = req.body.progress;
    task.is_completed = req.body.is_completed;
    task.date_completed = req.body.date_completed;
    task.save().then((task) => {
      res.send(task);
    });
  })
})


router.get("/tasks/completed", (req, res) => {
  const query = {
    userId: req.query.userId,
    is_completed: true,
  }
  Task.find(query).then((tasks) => {
    res.send(tasks)
  })
})


router.get("/profile/fill", (req, res) => {
  User.findById(req.query.userId).then((profile) => {
    res.send(profile);
  });
});

router.post("/friend/add", (req,res) => {
  const newFriend = new Friend({
    userId_1: req.body.userId_1,
    userName_1: req.body.userName_1,
    userId_2: req.body.userId_2,
    userName_2: req.body.userName_2,
  });

  newFriend.save().then((friend) => console.log("New Friend Added"));
});

router.get("/friend/current", (req,res) => {
  const query = {
    $or: [
      { userName_1: req.query.userName},
      { userName_2: req.query.userName},
    ],
  };

  Friend.find(query).then((friends) => res.send(friends));
});


router.post("/friend/delete", (req, res) => {
  Task.deleteOne({ _id:  req.body._id }).then((task) => res.send(task))
}) //?????

router.get("/tasks/completed", (req, res) => {
  const query = {
    userId_1: req.query.userId,
    is_completed: true,
  }
  Task.find(query).then((tasks) => {
    res.send(tasks)
  })
})




// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;


