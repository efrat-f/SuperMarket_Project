import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import CartProduct from "./cartProduct/CartProduct";
import { getItem, add } from './../../service/func'
import { useHistory } from 'react-router-dom';
import './Cart.css'

export default function CartList({updateTotal, totalPrice, showChange, setUserName, handleShow1, setLogin}) {
  const [change, setChange] = useState(0);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(null);
  let history  = useHistory();

  useEffect(async () => {
    setLoad(1);
    let [newProducts, status] = await add("/products/allProducts", {});
    if (status === 600){
      history.push('/productPage');
      setLogin(false)
      localStorage.setItem('validUser', false)
      setUserName(null)
      handleShow1()
      return
    }
    setProducts(newProducts);
    setChange(change + 1);
    setLoad(null);
  }, [])
  useEffect(async () => {
    setLoad(1);
    let [newProducts, status] = await add("/products/allProducts", {});
    if (status === 600){
      history.push('/productPage');
      setLogin(false)
      localStorage.setItem('validUser', false)
      setUserName(null)
      handleShow1()
      return
    }
    setProducts(newProducts);
      let [newCart, status1] = await add("/orders/getOrder", {orderId: 1}, localStorage.getItem('token'))
      if (status1 === 600){
        history.push('/productPage');
        setLogin(false)
        localStorage.setItem('validUser', false)
        setUserName(null)
        handleShow1()
        return
      }
      setCart(newCart.products);
      let total = 0;
      newCart.products.map((product) => {
        let item1 = newProducts.find((item) => { return product.productId == item.productId });
        total += product.amount * item1.price;
      })
      updateTotal(total);
      setLoad(null);
  }, [change, showChange])
  function updateChange() {
    setChange(change + 1);
  }
  return (
    <div className="container">
      <div className="row row-cols-4 cartTitelDiv">
        <div className="col cartTitel cartDivInProductFirst">name of product:</div>
        <div className="col cartTitel">price:</div>
        <div className="col cartTitel">amount order:</div>
        <div className="col cartTitel">final price:</div>
      </div>
      <br />
      {load && <div className = "load">
        <div className='circle'>
                  <div className='inner'></div>
               </div>
        </div>
      }
      {!load && cart.map((product, index) => {
        let item = products.find((item) => { return product.productId === item.productId });
        return (
          <CartProduct
            key = {index}
            productId={product.productId}
            name={item.name}
            amount={product.amount}
            price={item.price}
            updateChange={updateChange} />
        )
      })}
      <br />
      <div className="row row-cols-4 cartFooterDiv" />
      <div className = "totalPrice">total price: {totalPrice.toFixed(2)}₪</div>
    </div>
  );
}