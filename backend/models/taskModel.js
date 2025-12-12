const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },

    author: {
        type: String,
        trim: true,
        required: true,
    },

    publishedDate: {
        type: Date,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },
});

const Book = model('Book', bookSchema);
module.exports = Book;
