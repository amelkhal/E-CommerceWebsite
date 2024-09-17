import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookById } from '../redux/slices/bookSlice';

function BookDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedBook: book, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    // Dispatch the fetchBookById action to load the book details
    dispatch(fetchBookById(id));
  }, [dispatch, id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!book) return <div className="alert alert-info">Book not found</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img src={book.image} alt={book.title} className="img-fluid" />
        </div>
        <div className="col-md-8">
          <h1>{book.title}</h1>
          <p>By {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Price: ${book.price.toFixed(2)}</p>
          <p>In Stock: {book.countInStock}</p>
          <p>{book.description}</p>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;
