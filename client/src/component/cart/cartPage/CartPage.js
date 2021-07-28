import React, { useState } from 'react';
import CartList from './../CartList'
import { Button } from "react-bootstrap"
import './CartPage.css'
import Pay from './../../pay/Pay';
import Modal from 'react-bootstrap/Modal'

export default function CartPage({showChange, setUserName, handleShow1}) {
    const [totalPrice, setTotalPrice] = useState(0);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const updateTotal = (price) => { setTotalPrice(price) }
    return (
        <div className="container">
            <br />
            <CartList totalPrice={totalPrice} updateTotal={updateTotal} showChange = {showChange} setUserName = {setUserName} handleShow1={handleShow1}/>
            <br />
            <div className="cartPageButton">
                <Button variant="primary" className="button" onClick={() => { if(totalPrice>0)handleShow() }}>order</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <h3>enter address...</h3>
                    </Modal.Header>
                    <div>
                        <Pay total={totalPrice} handleClose = {handleClose}/>
                    </div>
                </Modal>
            </div>
        </div>
    )
}