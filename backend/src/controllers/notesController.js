import Note from "../models/Note.js";

//if req not used so use _ instead as convention like this (_,res)
export const getNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //newest one
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error getting all notes", error);
  }
};

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const newNote = await note.save();
    res.status(200).json(newNote);
  } catch (error) {
    console.error("error in creating note", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    console.error("Error getting a note", error);
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote)
      return res.status(404).json({ message: "note not found" });

    res.status(200).json({ message: "note updated" });
  } catch (error) {
    console.error("error in creating note", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "note deleted" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
