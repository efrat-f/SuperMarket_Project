import React from "react"
import './../../Button.css'
import { deleteItem } from './../../../service/func'
import './CartProduct.css'
import { Button } from "react-bootstrap"

export default function cartProduct({ productId, price, name, amount, updateChange }) {
    const deleteProduct = async () => {
        await deleteItem("/orders/removeProduct", {orderId:1, productId: productId}, localStorage.getItem('token'))
        updateChange();
    }
    return (
        <div className="cartProduct">
            <div className="row row-cols-4 cartProductDiv">
                <div className="col cartProductDivDiv"><div className="productDivText">{name}</div></div>
                <div className="col cartProductDivDiv"><div className="productDivText">{price.toFixed(2)}₪</div></div>
                <div className="col cartProductDivDiv"><div className="productDivText">{amount}</div></div>
                <div className="col cartProductDivDivLast"><div className="productDivText">{(price * amount).toFixed(2)}₪</div></div>
            </div>
            <div className="cartProductButtonDiv"><Button className="button" variant="secondary" onClick={deleteProduct}><div className = "fa fa-trash"></div></Button></div>
        </div>
    );
}