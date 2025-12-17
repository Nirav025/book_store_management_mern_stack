const Book = require('../models/bookModel');


const post = async (req, res) => {
    const { title, author, publishedDate, price } = req.body;

    await Book.create({
        title,
        author,
        publishedDate,
        price
    });

    res.json({
        success: true,
        message: "Book has been added successfully..."
    });
};




const view = async (req, res) => {
    await Book.find()
        .then((records) => {
            res.json({
                success: true,
                records
            });
        });
};




const singleView = async (req, res) => {
    const id = req.params.id;

    await Book.findById(id)
        .then((records) => {
            res.json({
                success: true,
                records
            });
        });
};


const trash = async (req, res) => {
    const id = req.params.id;

    await Book.findByIdAndDelete(id)
        .then(() => {
            res.json({
                success: true,
                message: "Book has been deleted..."
            });
        });
};



const update = async (req, res) => {
    const id = req.params.id;
    const { title, author, publishedDate, price } = req.body;

    await Book.findByIdAndUpdate(id, { title, author, publishedDate, price })
        .then(() => {
            res.json({
                success: true,
                message: "Book has been updated..."
            });
        });
};

module.exports = { post, view, trash, update, singleView };
