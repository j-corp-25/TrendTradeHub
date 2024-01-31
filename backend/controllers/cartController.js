// controllers/productController.js
import Cart from '../models/cartModel.js';

const getCartContent = async (req, res) => {
    const userId = req.userId
    try {
        const cart = await Cart.findOne({ author: userId }).populate('content');
    
        if (!cart) {
          return res.status(404).json({ error: 'Cart not found' });
        }
        res.status(200).json({ cart });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

const addToCart = async (req, res) => {
    const userId = req.userId
   



}

export { getCartContent}
    

