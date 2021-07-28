import React from "react"
import './img.css'

export default function Img({ src }) {
    return (
        <div className="text-center">
            <img src={src} className="rounded" className="img" alt="not found"></img>
        </div>
    );
}
