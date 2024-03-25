const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Project = require("../../models/Projects");
router.post("/getuserdata", (req, res) => {
  console.log(req.body.email);
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.json(user);
    } else {
      return res.status(400).json({ message: "Account Not Found" });
    }
  });
});

router.post("/createproject", (req, res) => {
  Project.findOne({ projectID: req.body.projectID }).then((project) => {
    if (project) {
      return res.status(400).json({ message: "projectID already exists" });
    } else {
      const newProject = new Project({
        projectName: req.body.projectName,
        owner: req.body.owner,
        description: req.body.description,
        projectID: req.body.projectID,
      });

      User.findOne({ email: req.body.owner }).then((user) => {
        if (user) {
          user.joinedProjects.push(req.body.projectID);

          user.save().catch((err) => {
            return res.status(400).json({ message: "Error" });
          });
        } else {
          return res.status(400).json({ message: "Account Not Found" });
        }
      });

      newProject
        .save()
        .then((project) => res.json(project))
        .catch((err) => {
          return res.status(400).json({ message: "Error" });
        });
    }
  });
});

router.post("/viewallprojects", (req, res) => {
  Project.find({}).then((project) => {
    if (project) {
      return res.json(project);
    } else {
      return res.status(400).json({ message: "Projects Not Found" });
    }
  });
});

router.post("/getprojectdata", (req, res) => {
  Project.findOne({ projectID: req.body.projectID }).then((project) => {
    if (project) {
      Project.findOne({ ID: "main" }).then((mains) => {
        if (mains) {
          project.availability1 = mains.availability1;
          project.availability2 = mains.availability2;
          project.capacity1 = mains.capacity1;
          project.capacity2 = mains.capacity2;
          return res.json(project);
        } else {
          return res.status(400).json({
            message: "An Error Happened (Main Project Set not found)",
          });
        }
      });
    } else {
      return res.status(400).json({ message: "Project Not Found" });
    }
  });
});

router.post("/joinproject", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      Project.findOne({ projectID: req.body.projectID }).then((project) => {
        if (project) {
          if (user.joinedProjects.includes(project.projectID)) {
            return res.status(400).json({ message: "Project Already Joined" });
          } else {
            user.joinedProjects.push(req.body.projectID);

            user
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          }
        } else {
          return res.status(400).json({ message: "Project Not Found" });
        }
      });
    } else {
      return res.status(400).json({ message: "Account Not Found" });
    }
  });
});

router.post("/checkin", (req, res) => {
  if (req.body.amount < 0) {
    return res.status(400).json({ message: "Invalid" });
  }
  Project.findOne({ projectID: req.body.projectID }).then((project) => {
    if (project) {
      Project.findOne({ ID: "main" }).then((mains) => {
        if (mains) {
          if (req.body.set === 1) {
            if (mains.availability1 + req.body.amount > mains.capacity1) {
              return res.status(400).json({ message: "At capacity" });
            } else {
              mains.availability1 = mains.availability1 + req.body.amount;
              mains
                .save()
                .then((mains) => res.json(mains))
                .catch((err) => console.log(err));
            }
          } else if (req.body.set === 2) {
            if (mains.availability2 + req.body.amount > mains.capacity2) {
              return res.status(400).json({ message: "At capacity" });
            } else {
              mains.availability2 = mains.availability2 + req.body.amount;
              mains
                .save()
                .then((mains) => res.json(mains))
                .catch((err) => console.log(err));
            }
          }
        } else {
          return res.status(400).json({
            message: "An Error Happened (Main Project Set not found)",
          });
        }
      });
    } else {
      return res.status(400).json({ message: "Project Not Found" });
    }
  });
});

router.post("/checkout", (req, res) => {
  if (req.body.amount < 0) {
    return res.status(400).json({ message: "Invalid" });
  }
  Project.findOne({ projectID: req.body.projectID }).then((project) => {
    if (project) {
      Project.findOne({ ID: "main" }).then((mains) => {
        if (mains) {
          if (req.body.set === 1) {
            if (mains.availability1 - req.body.amount < 0) {
              return res.status(400).json({ message: "No More" });
            } else {
              mains.availability1 = mains.availability1 - req.body.amount;
              mains
                .save()
                .then((mains) => res.json(mains))
                .catch((err) => console.log(err));
            }
          } else if (req.body.set === 2) {
            if (mains.availability2 - req.body.amount < 0) {
              return res.status(400).json({ message: "No More" });
            } else {
              mains.availability2 = mains.availability2 - req.body.amount;
              mains
                .save()
                .then((mains) => res.json(mains))
                .catch((err) => console.log(err));
            }
          }
        } else {
          return res.status(400).json({
            message: "An Error Happened (Main Project Set not found)",
          });
        }
      });
    } else {
      return res.status(400).json({ message: "Project Not Found" });
    }
  });
});

router.post("/adduser", (req, res) => {
  console.log(req.body.projectID);
  if (req.body.newUser === "") {
    return res.status(400).json({ message: "Invalid" });
  }
  User.findOne({ email: req.body.newUser }).then((user) => {
    if (user) {
      Project.findOne({ projectID: req.body.projectID }).then((project) => {
        if (project) {
          if (project.authUsers.includes(req.body.newUser)) {
            return res.status(400).json({ message: "Already Invited" });
          } else {
            project.authUsers.push(req.body.newUser);
            console.log(project.authUsers);
            project
              .save()
              .then((project) => res.json(project))
              .catch((err) => console.log(err));

            user.joinedProjects.push(req.body.projectID);
            user.save().catch((err) => {
              return res.status(400).json({ message: "Error" });
            });
          }
        } else {
          return res.status(404).json({ message: "Project Not Found" });
        }
      });
    } else {
      return res.status(404).json({ message: "User Not Found" });
    }
  });
});

module.exports = router;
