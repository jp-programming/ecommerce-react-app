import { updateDoc, doc } from "firebase/firestore";

export const updateQT = async (db, uid, cart, symbol) => {
    symbol = symbol === '-'
        ? (a, b) => a - b
        : (a, b) => a + b;

    await updateDoc(doc(db, 'cart', uid), {
        cartQuantity: symbol(cart.total, cart.quantity),
        cartTotal: Number(symbol(cart.totalAmount, (cart.price * cart.quantity)).toFixed(2))
    });
}