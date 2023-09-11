import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import styles from './HeaderCartButton.module.css';


const HeaderCartButton = (props) => {
    const [buttonIsHighlighted, setbuttonIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const buttonStyles = `${styles.button} ${buttonIsHighlighted ? styles.bump : ''}`;

    useEffect(() => {
        if (cartCtx.length === 0) {
            return;
        };
        setbuttonIsHighlighted(true);

        const timer = setTimeout(() => {
            setbuttonIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer)
        };

    }, [items]);


    return (
        <button className={buttonStyles} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={styles.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
};


export default HeaderCartButton;


