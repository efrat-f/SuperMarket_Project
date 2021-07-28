import React, { useState } from 'react';
import ProductList from './../productList/ProductList'
import { Nav } from 'react-bootstrap'
import './ProductPage.css'

export default function ProductPage({ initAndShow, handleShow1 }) {
  const [category, setCategory] = useState("All Products")
  const changeCategory = (category) => setCategory(category);
  return (
    <div>
      <Nav
        className="productPageNav"
        activeKey={category}
        onSelect={(eventKey) => { changeCategory(eventKey); }} >
        <Nav.Item>
          <Nav.Link eventKey="All Products" className="productPageNavLink">‏All Products</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Fruits" className="productPageNavLink">‏Fruits</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Vegetables" className="productPageNavLink">Vegetables</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Drinks" className="productPageNavLink">Drinks</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Cereal & Breakfast" className="productPageNavLink">Cereal & Breakfast</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Chocolate" className="productPageNavLink">Chocolate</Nav.Link>
        </Nav.Item>
      </Nav>
      <ProductList category={category} initAndShow={initAndShow} handleShow1={handleShow1} />
    </div>
  )
}