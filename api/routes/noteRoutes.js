const router = require("express").Router();
const Notes = require("../models/Notes");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// create a note
router.post("/newnote", async (req, res) => {
  const userId = req.body.user;
  const noteTitle = req.body.title;
  const noteText = req.body.text;

  if (!userId || !noteTitle || !noteText) {
    return res.status(400).json("Not provided all information.");
  }

  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(404).json("User not found!");
    }

    const foundNotes = await Notes.find({ user: userId });
    if (foundNotes) {
      for (const note of foundNotes) {
        if (note.title === noteTitle) {
          res.status(409).json("User already have a note with provided title!");
        }
      }
    }
    const createdNote = new Notes(req.body);
    const savedNote = await createdNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all notes of all users - for admin maybe
router.get("/alluser/allnotes", async (req, res) => {
  try {
    const notes = await Notes.find();
    if (!notes) {
      return res.status(404).json("No notes found!");
    }
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all notes for specific user - for user
router.get("/user/allnotes/:userId", async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json("User ID required!");
  }
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(404).json("User not found!");
    }

    const foundNotes = await Notes.find({ user: userId });

    if (!foundNotes) {
      res.status(404).json("No notes found for user!");
    }

    res.status(200).json(foundNotes);
    ////////////////////////////////
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a note
router.put("/update/:noteId", async (req, res) => {
  const noteId = req.params.noteId;
  const userId = req.body.userId;

  if (!userId || !noteId) {
    return res.status(400).json("NoteID and UserID required!");
  }

  try {
    const foundNote = await Notes.findById(noteId);
    if (!foundNote) {
      return res.status(404).json("No notes found with provided ID!");
    }

    if (foundNote.user.toString() !== userId) {
      return res.status(403).json("You can only update your notes!");
    }

    const allnotes = await Notes.find({ user: userId });

    if (!allnotes) {
      return res.status(404).json("No notes found!");
    }

    if (allnotes && req.body.title) {
      for (const note of allnotes) {
        if (note.title.toString() === req.body.title) {
          return res
            .status(409)
            .json("User already have a note with given title!");
        }
      }
    }

    const updatedPost = await Notes.findByIdAndUpdate(
      noteId,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedPost);
    //////////////////////////////////
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a note
router.delete("/delete/:noteId", async (req, res) => {
  const noteId = req.params.noteId;
  const userId = req.body.userId;

  if (!noteId || !userId) {
    return res.status(400).json("PostID and UserID required!");
  }

  try {
    const foundNote = await Notes.findById(noteId);
    if (!foundNote) {
      return res.status(404).json("Note not found!");
    }
    if (foundNote.user.toString() !== userId) {
      return res.status(400).json("You can delete only your posts!");
    }
    await foundNote.deleteOne();
    res.status(200).json("Note has been deleted successfully!");
    ////////////////////////////////////////////
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
