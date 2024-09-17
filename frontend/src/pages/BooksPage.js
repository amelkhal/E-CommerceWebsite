import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/slices/bookSlice';
import BookItem from '../components/books/BookItem';

function BooksPage() {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const addToCart = (book) => {
    // Implement add to cart functionality
    console.log('Added to cart:', book);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Books</h1>
      <div className="row">
        {books.map((book) => (
          <div key={book._id} className="col-md-4 mb-4">
            <BookItem 
              book={book} 
              onAddToCart={addToCart}
              showDetailsButton={true}
              showAddToCartButton={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksPage;