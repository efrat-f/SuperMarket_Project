import React, { useEffect, useState } from 'react';
import { NavLink, Link, withRouter, useHistory } from 'react-router-dom';
import './Menu.css';

export default function Menu(props) {
    let history  = useHistory();
    useEffect(() => {
        history.push('/productPage');
    }, [])
    return (
        <div>
            <ul className="menuUl">
                <li className="menuUlLi">
                    {props.userLogin==true && <NavLink to='/cartPage' className="menuNavLink"  activeclass="active" as={Link}>cart</NavLink>}
                    {props.userLogin==false && <button  onClick={props.onClickCart}  className="menuNavLink">cart</button>}
                    </li>
                <li className="menuUlLi"><NavLink to='/productPage' className="menuNavLink"  activeclass="active" as={Link}>Product</NavLink></li>
                <li className="menuUlLi"><NavLink to='/aboutPage' className="menuNavLink"  activeclass="active" as={Link}>About</NavLink></li>
                <li className="menuUserName dropdown">
                
                
                
                <a href="javascript:void(0)" className="dropbtn"><button className="menuUlLi material-icons account_circle menuNavLink"  activeclass="active" /* onClick={()=>{props.initAndShow("")}} */ ><i className="">&#xe853;</i></button></a>
                <div className="dropdown-content">
                <a onClick={()=>{props.initAndShow("")}}>Login</a>
                <a onClick={()=>{props.setLogin(false); history.push('/productPage');}}>Sign out</a>
                </div>
                </li>
                {props.existUserName && <div className="menuUserNameDiv menuUserNameDiv menuUserName">{"Hello, " + props.existUserName}</div>}
            </ul>
        </div>
    )
}