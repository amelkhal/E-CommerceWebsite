import React from 'react';
import { Link } from 'react-router-dom';

const BookItem = ({ book, onAddToCart, showDetailsButton = true, showAddToCartButton = true }) => {
  return (
    <div className="card h-100">
      <img src={book.image} className="card-img-top" alt={book.title} style={{ height: '300px', objectFit: 'cover' }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">By {book.author}</p>
        <p className="card-text">Genre: {book.genre}</p>
        <p className="card-text">Price: ${book.price.toFixed(2)}</p>
        <p className="card-text">In Stock: {book.countInStock}</p>
        <div className="mt-auto">
          {showDetailsButton && (
            <Link to={`/books/${book._id}`} className="btn btn-info me-2">Details</Link>
          )}
          {showAddToCartButton && (
            <button onClick={() => onAddToCart(book)} className="btn btn-primary">Add to Cart</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookItem;