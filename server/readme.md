## Users:
### sign-up a new user
Expected url: http://localhost:27017/users/  method:POST<br/>
Expected body: JSON 
```json
{
    "userId": "---",
    "userName": "---",
    "password": "---",
    "email": "---@---.---",
    "phone": "---",
    "type": "client" || "manager"
}
```
send mail that the user sign-up successfully

### updat user details
update a user details:password,firstName,lastName,email,phone,type<br/>
Expected url: http://localhost:27017/users/ method:PUT<br/>
Expected body:JSON
```json
{
    "userId": "---",
    "userName": "---",
    "password": "---",
    "firstName": "---",
    "lastName": "---",
    "email": "---@---.---",
    "phone": "---",
    "type": "client" || "manager"
}
```

### delet a user
Expected url: http://localhost:27017/users method:DELETE<br/>
Expected body:JSON One or more of the following fields
 ```json
 { 
    "userId": "---"
}
```

### get user detailes
Expected url: http://localhost:27017/users method:GET<br/>
Expected body:JSON One or more of the following fields
 ```json
 { 
    "userId": "---"
}
```

### login to the site
Expected url: http://localhost:27017/users/login method:POST<br/>
Expected body:JSON
 ```json
{ 
    "password": "---", 
    "userId":"---"
}
```
onSucces: return token in the header of the res

### send Email
Expected url: http://localhost:27017/users/sendEmail method:POST<br/>
Expected body:JSON
need to send the token in the header of the req

## orders:
### add a new order
Expected url: http://localhost:27017/orders  method:POST<br/>
Expected body: JSON 
```json
{
    "orderId": "---" 
}
```
need to send the token in the header of the req

### get a specific order
Expected url: http://localhost:27017/orders/getOrder  method:POST<br/>
need to send the token in the header of the req<br/>
Expected body:JSON
```json
{ 
    "orderId": "---"
}
```

### delete a order
Expected url: http://localhost:27017/orders  method:DELETE<br/>
need to send the token in the header of the req<br/>
Expected body:JSON One or more of the following fields
```json
{ 
    "orderId": "---"
}
```

### update the amount of product in specific order
update the amount of product in specific order, if product not exist add it to order
Expected url: http://localhost:27017/orders/setAmountProduct  method:PUT <br/>
Expected body:JSON
```json
{
    "orderId": "---",
    "productId":"---",
    "amount":"---"
}
``` 
need to send the token in the header of the req

### delete a product from a specific order
Expected url: http://localhost:27017/orders/removeProduct  method:DELETE<br/>
Expected body:JSON
```json
{
    "orderId": "---",
    "productId":"---"
}
``` 
need to send the token in the header of the req

## products:

### get a product detailes
Expected url: http://localhost:27017/products  method:GET<br/>
Expected body:JSON
```json
{
    "productId":"---"
}
```

### get a products detailes
Expected url: http://localhost:27017/products/allProducts  method:POST<br/>

### get a products by category
Expected url: http://localhost:27017/products/category  method:POST<br/>
Expected body:JSON
```json
{
    "category": "---"
}
```

## Streets:
### get streets list
Expected url: http://localhost:27017/streets  method:GET<br/>