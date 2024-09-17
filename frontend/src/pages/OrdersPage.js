import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/slices/orderSlice';

function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    // Dispatch the fetchOrders action to load user orders
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h1 className="mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="list-group">
          {orders.map((order) => (
            <div key={order._id} className="list-group-item">
              <h5 className="mb-1">Order ID: {order._id}</h5>
              <p className="mb-1">Total Price: ${order.totalPrice.toFixed(2)}</p>
              <p className="mb-1">Paid: {order.isPaid ? 'Yes' : 'No'}</p>
              <p className="mb-1">Delivered: {order.isDelivered ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
