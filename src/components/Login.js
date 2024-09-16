import React, { useState } from 'react'
import DonorLogin from './DonorLogin'
import BloodBankLogin from './BloodBankLogin'

const Login = () => {
    
    const [mode, setMode] = useState("donor")
    
    return (
        <div>
            <section className="vh-100">
                <div className="container-fluid h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>

                                {mode==="donor"?<DonorLogin/>:<BloodBankLogin/>}

                                <div className="container mt-3 ">
                                    <div className="row text-center">
                                        <div className={`col btn rounded-0 py-2 border-end border-${mode==="donor"?"bottom":"top"}`} onClick={()=> setMode("donor")}>Donor</div>
                                        <div className={`col btn rounded-0 py-2 border-start border-${mode==="bloodBank"?"bottom":"top"}`} onClick={()=> setMode("bloodBank")}>Blood Bank</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Login