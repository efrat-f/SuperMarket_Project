import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
// import emailjs from 'emailjs-com';
import { add, getItem, update } from '../../service/func'
import { useHistory } from 'react-router';

export default function MyApp({total}) {
    let history  = useHistory();
    const updateStoke = () => {
        return
        // let userDetails = await getItem("usersDetails/" + localStorage.getItem('id'));
        // let userCart = await getItem("usersCart/" + localStorage.getItem('id'));
        // userCart.cart.map(async (product) => {
        //     let prevProduct = await getItem("products/" + product.id);
        //     prevProduct.amountExist -= product.amountInvited;
        //     update("products/" + product.id, prevProduct);
        // }
        // )
        // emailjs.send('project', 'template_vzy9j9o', { customerAddress: userDetails.email }, 'user_sAsptUEXb5THePUU0QwGE')
        //     .then((res) => {
        //         console.log(res.text);
        //     }, (error) => {
        //         console.log(error.text);
        //     });
        
        // let userCart = await getItem("usersCart/" + localStorage.getItem('id'));
        // userCart.cart.map(async (product) => {
        //     let prevProduct = await getItem("products/" + product.id);
        //     prevProduct.amountExist -= product.amountInvited;
        //     update("products/" + product.id, prevProduct);
        // }
        // )
        //await add('/sendEmail', {}, localStorage,getItem('token'))
    }
    const onSuccess = (payment) => {
        updateStoke()
        history.push('/payPage')
    }

    const onCancel = (data) => {
    }

    const onError = (err) => {
    }

    let env = 'sandbox'; 
    let currency = 'ILS'; 

    const client = {
        sandbox: 'AULYr_tEsD8S9WE1vWhEF_f0fRI3IfFBicyx91tAFkAgbgdK0m21nguj0yvTFwhmFYKLFndsnMxN8CAa',
        production: 'YOUR-PRODUCTION-APP-ID',
    }
    return (
        <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
    );

}