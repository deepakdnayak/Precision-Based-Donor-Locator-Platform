import React from 'react'
import Background from '../images/background.jpg'

const Home = () => {
    let homeCss = {
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: "0.75"
    }
    return (
        <div>
            <div style={homeCss} className="vh-100 d-flex align-items-center">
                <div className="container text-white">
                    <h1>Be Greatfull and Donate<br />Blood</h1>
                    <h5 >Save life and be a Real Hero</h5>
                    <button type="button" className="btn btn-light">Find Blood</button>
                </div>
            </div>
        </div>
    )
}

export default Home