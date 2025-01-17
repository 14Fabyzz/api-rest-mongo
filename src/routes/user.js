const express = require("express");
const userSchema = require("../models/user");
const router = express.Router();

//create user

router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//get all users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a user
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


// update a user
// get a user
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const {name,age,email} = req.body;
  userSchema
    .updateOne({_id: id}, { $set: {name,age,email} })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


// delete a user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })  // Usar deleteOne en lugar de remove
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    })
    .catch((error) => res.status(500).json({ message: error.message }));
});




module.exports = router;
