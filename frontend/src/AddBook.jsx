
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Api from "./Api";
import { FaTrash, FaEdit } from "react-icons/fa";


const AddBook = () => {
  const { handleSubmit, register, reset } = useForm();
  const [id, setId] = useState(null);
  const [books, setBooks] = useState([]);

  async function viewBooks() {
    await Api.get("/")
      .then((res) => setBooks(res.data.records))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    viewBooks();
  }, []);

  async function addBook(data) {
    if (!id) {
      await Api.post("/", data)
        .then(() => {
          alert("Book Added!");
          viewBooks();
        })
        .catch((err) => console.log(err));
    } else {
      await Api.put(`/${id}`, data)
        .then(() => {
          alert("Book Updated!");
          setId(null);
          reset();
          viewBooks();
        })
        .catch((err) => console.log(err));
    }
    reset();
  }

  async function trash(id) {
    if (confirm("Are you sure?")) {
      await Api.delete(`/${id}`)
        .then(() => {
          alert("Book Deleted!");
          viewBooks();
        })
        .catch((err) => console.log(err));
    }
  }

  async function update(id) {
    setId(id);
    await Api.get(`/${id}`)
      .then((res) => reset(res.data.records))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="library-bg">

        {/* FORM */}
        <div className="container py-4">
          <div className="col-md-6 mx-auto">
            <div className="form-box shadow-sm p-4">
              <h3 className="text-center mb-3 form-title">
                {id ? "Update Book" : "Add New Book"}
              </h3>

              <form onSubmit={handleSubmit(addBook)}>
                <label className="form-label mt-2 fw-semibold">Title</label>
                <input type="text" className="form-control input-field"
                  {...register("title")} required />

                <label className="form-label mt-3 fw-semibold">Author</label>
                <input type="text" className="form-control input-field"
                  {...register("author")} required />

                <label className="form-label mt-3 fw-semibold">Published Date</label>
                <input type="date" className="form-control input-field"
                  {...register("publishedDate")} required />

                <label className="form-label mt-3 fw-semibold">Price</label>
                <input type="number" className="form-control input-field"
                  {...register("price")} required />

                <button className={`btn submit-btn w-100 mt-4`}>
                  {id ? "Update Book" : "Add Book"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* BOOK LIST */}
        <div className="container mt-5">
          <h2 className="fw-bold text-center list-title mb-4">
            Book Collection
          </h2>

          <div className="row">
            {books?.map((book) => (
              <div key={book._id} className="col-md-4 mb-4">
                <div className="book-card shadow-sm">
                  <h5 className="fw-bold">{book.title}</h5>
                  <p><strong>Author:</strong> {book.author}</p>
                  <p>
                    <strong>Published:</strong>{" "}
                    {new Date(book.publishedDate).toLocaleDateString()}
                  </p>
                  <p><strong>Price:</strong> ₹{book.price}</p>

                  <div className="d-flex justify-content-end mt-3">
                    <button className="icon-btn edit me-2"
                      onClick={() => update(book._id)}>
                      <FaEdit />
                    </button>
                    <button className="icon-btn delete"
                      onClick={() => trash(book._id)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </>
  );
};

export default AddBook;

