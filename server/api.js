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
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  res.send(req.user);
});


router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) {
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
    res.send({});
}
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
    challengerId: req.body.challengerId,
    is_accepted: req.body.is_accepted,
    previous_progress_log: req.body.previous_progress_log
  });

  newTask.save().then((task) => {
    res.send(task);
    if (req.body.is_challenge) {
      try {
        socketManager.getSocketFromUserID(task.userId).emit("new_challenge", task);
      } catch (e) {
        console.error(e);
      }
    }
  });
});

router.get("/tasks/current", (req, res) => {
  const query = {
    userId: req.user._id,
    is_completed: false,
  }
  Task.find(query).then((tasks) => {
    res.send(tasks);
  })
});


router.post("/tasks/delete", (req, res) => {
  if (req.body.is_challenge) {
    Task.findOne({_id: req.body._id}).then((task) => {
      task.is_completed = undefined;
      task.is_challenge = undefined;
      task.is_accepted = undefined; 
      task.save().then((task) => {
        res.send(task);
        try {
          socketManager.getSocketFromUserID(req.body.challengerId).emit("challenge_declined", task);
        } catch (e) {
          console.error(e);
        }
      });
    })
  } else {
    Task.deleteOne({ _id:  req.body._id }).then((task) => res.send(task))
  }
})


router.post("/tasks/update", (req, res) => {
  Task.findOne({_id: req.body._id}).then((task) => {
    task.progress = req.body.progress;
    task.is_completed = req.body.is_completed;
    task.date_completed = req.body.date_completed;
    task.previous_progress_log = req.body.previous_progress_log;
    task.save().then((task) => {
      res.send(task);
      try {
        socketManager.getSocketFromUserID(req.user._id).emit("task_updated", task);
      } catch (e) {
        console.error(e);
      }
      
      if (req.body.challengerId) {
        try {
          socketManager.getSocketFromUserID(req.body.challengerId).emit("challenge_updated", task);
        } catch (e) {
          console.error(e);
        }
      }
    });
  })
})


router.get("/tasks/challenges", (req, res) => {
  const query = {
    $or: [
      { userId: req.user._id, is_challenge: true, is_accepted: false },
      { challengerId: req.user._id },
    ],
  };

  Task.find(query).then((tasks) => {
    res.send(tasks)
  })
})

router.get("/tasks/challenges/received", (req, res) => {
  const query = { 
    userId: req.user._id, 
    is_challenge: true, 
    is_accepted: false 
  }
  
  Task.find(query).then((tasks) => {
    res.send(tasks)
  })
})

router.post("/tasks/challenges/accept", (req, res) => {
  Task.findOne({_id: req.body._id}).then((task) => {
    task.is_completed = false;
    task.is_accepted = true;
    task.previous_progress_log = req.body.previous_progress_log;

    task.save().then((task) => {
      res.send(task);
      try {
        socketManager.getSocketFromUserID(req.user._id).emit("challenge_accepted", task);
        socketManager.getSocketFromUserID(req.body.challengerId).emit("challenge_accepted", task);
      } catch (e) {
        console.error(e);
      }
    });
  })
})

router.post("/tasks/challenges/decline", (req, res) => {
  Task.findOne({_id: req.body._id}).then((task) => {
    task.is_completed = undefined;
    task.is_challenge = undefined;
    task.is_accepted = undefined; 
    task.save().then((task) => {
      res.send(task);
      try {
        socketManager.getSocketFromUserID(req.user._id).emit("challenge_declined", task);
        socketManager.getSocketFromUserID(req.body.challengerId).emit("challenge_declined", task);
      } catch (e) {
        console.error(e);
      }
      
    });
  })
})


router.get("/tasks/completed", (req, res) => {
  const query = {
    userId: req.user._id,
    is_completed: true,
  }
  Task.find(query).then((tasks) => {
    res.send(tasks)
  })
})

router.post("/tasks/completed/delete", (req, res) => {
  if (req.body.is_challenge) {
    Task.findOne({_id: req.body._id}).then((task) => {
      task.userId = undefined;
      task.save().then((task) => {
        res.send(task);
      });
    })
  } else {
    Task.deleteOne({ _id:  req.body._id }).then((task) => res.send(task))
  }
})


router.post("/profile/points", (req, res) => {
  User.findById(req.body.userId).then((profile) => {
    profile.points = req.body.pts + profile.points;
    profile.coins = req.body.coins + profile.coins;
    profile.save().then((profile) => {
      res.send(profile);
    })
  });
})

router.post("/profile/score", (req, res) => {
  User.findById(req.body.userId).then((profile) => {
    profile.high_score = req.body.high_score;
    profile.save().then((profile) => {
      res.send(profile);
    })
  });
})

router.post("/profile/buyskin", (req, res) => {
  User.findById(req.body.userId).then((profile) => {
    profile.available_skins = req.body.available_skins;
    profile.coins = profile.coins - req.body.coins;
    profile.skin = req.body.skin;
    profile.save().then((profile) => {
      res.send(profile);
    })
  });
})

router.post("/profile/icon", (req, res) => {
  User.findById(req.body.userId).then((profile) => {
    profile.icon = req.body.icon;
    profile.save().then((profile) => {
      res.send(profile);
    })
  });
})

router.post("/profile/skin", (req, res) => {
  User.findById(req.body.userId).then((profile) => {
    profile.skin = req.body.skin;
    profile.save().then((profile) => {
      res.send(profile);
    })
  });
})

router.get("/profile/fill", (req, res) => {
  User.findById(req.user._id).then((profile) => {
    res.send(profile);
  });
});


router.get("/friend/", (req, res) => {
  User.findOne({name: req.query.friendName}).then((user) => {
    res.send(user);
  }) 
})

router.get("/friend/fill", (req, res) => {
  User.findById(req.query._id).then((profile) => {
    res.send(profile);
  });
});

router.get("/friend/suggestions", (req, res) => {
  const query = {
    name: new RegExp(`^${req.query.name}`, "i"),
    _id: {$nin : [req.user._id]}
  }
  User.find(query).then(users => {
    res.send(users)
  })
})

router.get("/friend/current", (req, res) => {
  const query = {
    $or: [
      { userId_1: req.query.userId, is_friend: true },
      { userId_2: req.query.userId, is_friend: true },
    ],
  };
  Friend.find(query).then((friends) => res.send(friends));
});


router.get("/friend/requests", (req,res) => {
  const query = {userId_2: req.user._id, is_friend: false};
  Friend.find(query).then((friends) => res.send(friends));
});


router.get("/friend/requests/sent", (req,res) => {
  const query = {userId_1: req.user._id, is_friend: false};
  Friend.find(query).then((friends) => res.send(friends));
});


router.post("/friend/add", (req,res) => {
  const newFriend = new Friend({
    userId_1: req.user._id,
    userName_1: req.user.name,
    userEmail_1: req.user.email,
    userId_2: req.body.userId_2,
    userName_2: req.body.userName_2,
    userEmail_2: req.body.userEmail_2,
    is_friend: false
  });

  newFriend.save().then((friend) => {
    res.send(friend);
    try {
      socketManager.getSocketFromUserID(req.user._id).emit("friend_request_sent", friend);
      socketManager.getSocketFromUserID(req.body.userId_2).emit("friend_request_received", friend);
    } catch (e) {
      console.error(e);
    }
    
  });
});


router.post("/friend/accept", (req, res) => {
  const query = {
    $or: [
      { userId_1: req.body.friendId, userId_2: req.user._id},
      { userId_1: req.user._id, userId_2: req.body.friendId},
    ],
  };
  Friend.findOne(query).then((friend) => {
    friend.is_friend = true;
    friend.save().then(friend => {
      res.send(friend);
      try {
        socketManager.getSocketFromUserID(req.user._id).emit("friend_request_accepted", friend);
        socketManager.getSocketFromUserID(friend.userId_1).emit("friend_request_accepted", friend);
      } catch (e) {
        console.error(e);
      }
      
    })
  });
});


router.post("/friend/delete", (req, res) => {
  const query = {
    $or: [
      { userId_1: req.body.friendId, userId_2: req.user._id},
      { userId_1: req.user._id, userId_2: req.body.friendId},
    ],
  };
  Friend.deleteOne(query).then((friend) => {
    res.send(friend);
    try {
      socketManager.getSocketFromUserID(req.body.friendId).emit("friend_deleted", req.user._id);
    } catch (e) {
      console.error(e);
    }
  });
});


router.post("/friend/request/decline", (req, res) => {
  const query = {
    userId_1: req.body.friendId, 
    userId_2: req.user._id 
  };
  Friend.deleteOne(query).then((friend) => {
    res.send(friend);
    try {
      socketManager.getSocketFromUserID(req.body.friendId).emit("friend_request_declined", req.user._id);

      // when user declines a friend request, this updates the notification badge
      socketManager.getSocketFromUserID(req.user._id).emit("request_declined", req.user._id);
    } catch (e) {
      console.error(e);
    }
    
  });
});

router.post("/friend/request/cancel", (req, res) => {
  const query = {
    userId_1: req.user._id,
    userId_2: req.body.friendId, 
  };
  Friend.deleteOne(query).then((friend) => {
    res.send(friend)
    try {
      socketManager.getSocketFromUserID(req.body.friendId).emit("friend_request_cancelled", req.user._id);
    } catch (e) {
      console.error(e);
    }
  });
});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;


