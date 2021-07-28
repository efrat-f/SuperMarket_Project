import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from "./../product/Product";
import { getItem, add } from "../../../service/func";
import { useHistory } from 'react-router-dom';
import './ProductList.css'


export default function ProductList({ category, initAndShow, setUserName, handleShow1}) {
  const [categoryProducts, setCategoryProducts] = useState(null);
  const [products, setProducts] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [load, setLoad] = useState(null);
  let history  = useHistory();

  useEffect(async () => {
    setLoad(1);
    if(category === "All Products"){
      let [newProducts, status] = await add("/products/allProducts", {});
      setProducts(newProducts);
    }else{
        let [newProducts, status] = await add("/products/category", {"category": category.toLowerCase()});
        setProducts(newProducts);
    }
    setLoad(null)
  }, [category])

  return (
    <div className="container">
      <br />
      <h1 className = "category">{category}</h1>
      <br />
      {load && <div className = "load">
        <div className='circle'>
                  <div className='inner'></div>
               </div>
        </div>
      }
      {!load && products && products.map((product, index) => {
        return (
          <Product key = {index}
            img={product.img}
            name={product.name}
            amountExist={product.amountExist}
            price={product.price}
            productId={product.productId}
            description = {product.description} 
            initAndShow={initAndShow}
            handleShow1={handleShow1}/>)
      })}
    </div>
  );
}