import React, { useEffect, useState } from 'react';
import './About.css'

export default function About() {
    return (
        <div className = "about">
            <div className = "about1">
                Welcome to Efruits!
            </div>
            <div className = "about2">
                You came to the right place!
            </div>
            <div className = "about3">
                In our shop you can order all food products that you want.
                <br/>
                The payment is in paypal(cerdit card/paypal account).
                <br/>
                We does delivers in Jerusalem.
            </div>
        </div>
    )
}