import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Img from './../img/img'
import './Product.css'
import CalcButton from "../calcButton/CalcButton";

export default function Product({ img, price, name, amountExist, productId, description, initAndShow, handleShow1 }) {
    return (
        <div className="container product">
            <div className="row productDiv">
                <div className="productDivDiv productDivImg"><Img src={img}></Img></div>
                <div className="productDivDiv">
                    <div className="productDivNameDescription">
                        <div className="productDivText">{name}</div>
                        <div className="productDivDescription">{description}</div>
                    </div>
                </div>
                <div className=" productDivDiv"><div className="productDivText">{price}₪</div></div>
                <div className="productCalcButton">
                    <CalcButton amountExist={amountExist} productId={productId} initAndShow={initAndShow} handleShow1={handleShow1}></CalcButton>
                </div>
            </div>
        </div>
    );
}