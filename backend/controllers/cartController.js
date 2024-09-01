import Cart from '../models/Cart.js';

export const getCartItems = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.book', 'title price');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart.items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            cart.items = [];
            await cart.save();
        }
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
