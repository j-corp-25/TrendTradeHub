import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductUnit.css';



function ProductUnit({product}) {
	return (

                
                <div class="product-item" >
                    <div class="image">
                        <a href="#/"><img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Product 4"/></a>
                    </div>
                    <div class="name">
                        <a href="#/">Leather laptop bag</a>
                    </div>
                    <div className="price-like-cart">
                        <div class="price">
                            <span>$722.00</span>
                        </div>
                        <div className="cart">
                            <button type="button" class="btn btn-primary">Add to Cart</button>
                        </div>
                        {/* <div className="like">
                            <button type="button" class="btn btn-default wishlist" data-toggle="tooltip" data-placement="right" title="Wishlist"><i class="fa fa-heart"></i></button>

                        </div> */}
                        
                    </div>
                    
                </div>
 
       	);
}
export default ProductUnit;