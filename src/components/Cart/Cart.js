import React, { Fragment, useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import styles from './Cart.module.css';


const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem(item);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmit(true);
        await fetch('https://food-app-api-a509f-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: cartCtx.items
            }),
        });
        setIsSubmit(false);
        setDidSubmit(true);

        cartCtx.clearCart();
    };

    const cartItems = <ul className={styles['cart-items']}>
        {cartCtx.items.map(item => (
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />
        ))}
    </ul>

    const ModalActions = (<div className={styles.actions}>
        <button className={styles['button--alt']}
            onClick={props.onCloseBtn}
        >Close</button>
        <button className={styles.button} onClick={orderHandler} >Order</button>
    </div>);

    const cartModalContent =
        <React.Fragment>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {
                isCheckout &&
                <Checkout
                    onSubmit={submitOrderHandler}
                    onCloseBtn={props.onCloseBtn} />
            }
            {!isCheckout && ModalActions}
        </React.Fragment>;

    const isSubmitModalContent = <p>Sending order data...</p>;

    const didsumbitModalcontent = <React.Fragment>
        <p>Successfully sent the order!</p>
        <div className={styles.actions}>
        <button className={styles.button} onClick={props.onCloseBtn}>Close</button>
        </div>
    </React.Fragment>

    return (
        <Modal onCloseBtn={props.onCloseBtn}>
            {!isSubmit && !didSubmit && cartModalContent}
            {isSubmit && isSubmitModalContent}
            {!isSubmit && didSubmit && didsumbitModalcontent}
        </Modal>
    );
};

export default Cart;
