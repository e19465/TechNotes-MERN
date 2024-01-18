const router = require("express").Router();
const User = require("../models/User");
const Notes = require("../models/Notes");
const bcrypt = require("bcrypt");

// registration
router.post("/register", async (req, res) => {
  const userUsername = req.body.username;
  const userPassword = req.body.password;

  if (!userUsername || !userPassword) {
    return res.status(400).json("Username and Password required!");
  }

  try {
    const foundUser = await User.findOne({ username: userUsername });
    if (foundUser) {
      return res.status(409).json("Username already exists!");
    }

    const hashedPW = await bcrypt.hash(userPassword, 10);

    const newUser = new User({
      username: userUsername,
      password: hashedPW,
    });

    // const savedUser = await newUser.save();
    // const { password, ...others } = savedUser._doc;
    // res.status(201).json(others);
    await newUser.save();
    res.status(201).json(`user ${userUsername} has been created!`);
    //////////////////////////////
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
router.post("/login", async (req, res) => {
  const userUsername = req.body.username;
  const userPassword = req.body.password;

  if (!userUsername || !userPassword) {
    return res.status(400).json("Username and Password required!");
  }

  try {
    const foundUser = await User.findOne({ username: userUsername });
    if (!foundUser) {
      return res.status(400).json("Wrong Credentials!");
    }

    const isValidated = await bcrypt.compare(userPassword, foundUser.password);

    if (!isValidated) {
      return res.status(400).json("Wrong Credentials!");
    }

    const { password, ...others } = foundUser._doc;
    res.status(200).json(others);
    ////////////////////////////
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all users
router.get("/alluser", async (req, res) => {
  try {
    const allUsers = await User.find().select("-password").lean();
    if (!allUsers) {
      return res.status(404).json("Users not found!");
    }
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update
router.put("/update/:userId", async (req, res) => {
  const userId = req.params.userId;
  const newUsername = req.body.username;

  if (!userId) {
    return res.status(400).json("User ID required!");
  }
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(404).json("User not found!");
    }

    const isUsernameExists = await User.findOne({ username: newUsername });

    if (isUsernameExists && isUsernameExists?._id.toString() !== userId) {
      return res.status(409).json("Username Already Exists!");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
    ////////////////////////////
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
router.delete("/delete/:userId", async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json("User ID required!");
  }
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(404).json("User not found!");
    }
    const notes = await Notes.findOne({ user: userId });
    if (notes) {
      return res.status(400).json("Can't delete!! User have assigned notes.");
    }
    await foundUser.deleteOne();
    res.status(200).json("User has been deleted successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
