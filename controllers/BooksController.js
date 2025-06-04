import bookModel from "../models/books.js";

const addBooks = async (req, res) => {
  const { title, author, pages, publisher } = req.body;

  try {
    const book = new bookModel({
      title,
      author,
      pages,
      publisher,
      createdBy: req.user._id, // ✅ Assign the logged-in user as creator
    });

    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await bookModel.find();
    res.json(books);
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log(err);
  }
};

const editBooks = async (req, res) => {
  const { id } = req.params;
  const { title, author, pages, publisher } = req.body;
  try {
    const book = await bookModel.findByIdAndUpdate(
      id,
      { title, author, pages, publisher },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getbookbyid = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookModel.findById(id);
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteBooks = async (req, res) => {
  try {
    const id = req.params.id;
    await bookModel.findByIdAndDelete(id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

export { addBooks, getBooks, editBooks, deleteBooks, getbookbyid };
