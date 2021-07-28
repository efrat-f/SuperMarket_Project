import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { update, getItem } from '../../../service/func'
import { useHistory } from 'react-router-dom';
import './CalcButton.css'


export default function CalcButton({ amountExist, productId, initAndShow, setUserName, handleShow1}) {
    const [amountInvited, setAmountInvited] = useState(1);
    let history  = useHistory();
    let addToCart = async () => {
        const[res, status] = await update("/orders/setAmountProduct", { productId: productId, amount: amountInvited, orderId: 1 }, localStorage.getItem('token'))
        if (status === 600){
            history.push('/productPage');
            localStorage.setItem('validUser', false)
            setUserName(null)
            handleShow1()
            return
        }
    }
    const checkUser = () => {
        localStorage.getItem("validUser") === "false" ? initAndShow("You have not yet entered our site, please log in now") : addToCart();
    }
    return (
        <div>
            <div className="calcButtonWidth calcButton">
                <button className="calcButtonHover calcButtonPlus" onClick={() => amountInvited < amountExist ? setAmountInvited(amountInvited + 1) : true}>+</button>
                <p className="calcButtonAmountInvited">{amountInvited}</p>
                <button className="calcButtonHover calcButtonMinus" onClick={() => amountInvited > 1 ? setAmountInvited(amountInvited - 1) : true}>-</button>
            </div>
            <button className="calcButtonHover calcButtonWidth calcButtonAddToCart material-icons" onClick={checkUser}>&#xe547;</button>
        </div>
    );
}

