import { useState, useEffect } from 'react';

import { getAllOrders } from '../services/orderService';
import { getBooks } from '../services/bookService';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedOrders, fetchedBooks] = await Promise.all([
          getAllOrders(),
          getBooks()
        ]);
        setOrders(fetchedOrders);
        setBooks(fetchedBooks);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h1 className="mb-4">Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Recent Orders</h2>
          <ul className="list-group">
            {orders.slice(0, 5).map((order) => (
              <li key={order._id} className="list-group-item">
                <p>Order ID: {order._id}</p>
                <p>Total: ${order.totalPrice.toFixed(2)}</p>
                <p>Status: {order.isPaid ? 'Paid' : 'Unpaid'}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h2>Book Inventory</h2>
          <ul className="list-group">
            {books.map((book) => (
              <li key={book._id} className="list-group-item">
                <p>{book.title}</p>
                <p>In Stock: {book.countInStock}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;