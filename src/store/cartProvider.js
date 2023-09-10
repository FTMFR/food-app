import React from 'react';
import CartContext from './cart-context';

const cartProvider = (props) => {
    const addItemtoCartHandler = item => { };
    const removeItemFromCartHandler = id => { };


    const cartCantext = {
        item: [],
        totalAmount: 0,
        addItem: addItemtoCartHandler,
        removeItem: removeItemFromCartHandler
    }


    return (
        <CartContext.Provider value={cartCantext}>
            {props.children}
        </CartContext.Provider>

    );
};


export default cartProvider;
