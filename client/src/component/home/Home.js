import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Menu from './Menu';
import Entrance from './../signIn/Entrance';
import PayPage from './../pay/payPage/PayPage';
import CartPage from './../cart/cartPage/CartPage';
import ProductPage from './../products/productPage/ProductPage';
import Registration from './../signIn/Registration';
import Modal from 'react-bootstrap/Modal';
import About from './../About'
import './Home.css'

export default function Home() {
    const [logOrSign, setLogOrSign] = useState(0);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [userLogin, setUserLogin] = useState(localStorage.getItem("validUser"));
    const [existUserName, setExistUserName]  = useState(null)
    const [modelTitle, setModelTitel] = useState("")
    const [signOut, setSignOut] = useState(0)
    const exit = ()=>{
        setSignOut(signOut+1)
    }
    const setUserName = (name)=>{
        setExistUserName(name)
    }
    const setLogin = (exist)=>{
        setUserLogin(exist)
        if(exist==false){
            setExistUserName(null)
        }
    }
    const initAndShow = (title=null)=>{
        handleShow();
        setLogOrSign(0);
        setModelTitel(title)
    }
   /*  useEffect(()=>{
        setLogin(false)
        localStorage.setItem("validUser", false);
    },[show, signOut]) */
    return (
        <div className = "home">
            <Router>
                <Menu initAndShow = {initAndShow} onClickCart={()=>{initAndShow("You have not yet entered our site, please log in now"); }} userLogin={userLogin} existUserName = {existUserName} handleShow1 = {handleShow1} setLogin = {setLogin}/>
                <Switch>
                <Route path='/aboutPage'>
                        <About />
                </Route>
                <Route path='/payPage'>
                    <PayPage />
                </Route>
                    
                    {userLogin == true && <Route path='/cartPage'>
                         
                         <CartPage showChange={show} setUserName = {setUserName} handleShow1={handleShow1} setLogin = {setLogin}/>
                    </Route>}
                    <Route path='/productPage'>
                        <ProductPage initAndShow = {initAndShow} setUserName = {setUserName} handleShow1={handleShow1}/>
                    </Route>
                </Switch>
            </Router>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header className = "modelHeader">
                    <div className = "homeDivTitle">
                    {modelTitle}
                    </div>
                    <div className = "homeDivText" onClick={() => { setLogOrSign(1) }}>
                    to register click here
                    </div>
                    <ul className="nav nav-tabs">
                        <li className={logOrSign == 0 ? "nav-link active" : "nav-link"} onClick={() => { setLogOrSign(0) }}>Login</li>
                        <li className={logOrSign == 1 ? "nav-link active" : "nav-link"} onClick={() => { setLogOrSign(1) }}>Registration</li>
                    </ul>
                </Modal.Header>
                <div>
                    {logOrSign == 0 ? <Entrance handleClose={handleClose} setUserName = {setUserName} setLogin = {setLogin}/> : <Registration handleClose={handleClose} setUserName = {setUserName} setLogin = {setLogin}/>}
                </div>
            </Modal>
            <Modal show={show1} onHide={handleClose1} >
                <Modal.Header className = "modelHeader">
                    <div className = "homeDivTitle">
                        To verify your identity, please log in again
                    </div>
                </Modal.Header>
                <div>
                </div>
            </Modal>
        </div>
    )
}