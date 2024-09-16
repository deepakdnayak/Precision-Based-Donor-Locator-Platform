import React from 'react'

const About = () => {
    return (
        <div>
            <section class="vh-100">
                <div class="container-fluid h-custom">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                class="img-fluid" alt="Sample" />
                        </div>
                        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                

                                <div class="my-4">
                                    <p class="text-center mx-3 mb-0 fs-1">LOGIN</p>
                                </div>

                                <div data-mdb-input-init class="form-outline mb-4">
                                    <label class="form-label" for="form3Example3">Email address</label>
                                    <input type="email" id="form3Example3" class="form-control form-control-lg"
                                        placeholder="Enter a valid email address" />
                                </div>

                                <div data-mdb-input-init class="form-outline mb-3">
                                    <label class="form-label" for="form3Example4">Password</label>
                                    <input type="password" id="form3Example4" class="form-control form-control-lg"
                                        placeholder="Enter password" />
                                </div>

                                <div class="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg"
                                        style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}} >Login</button>
                                    <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                                        class="link-danger">Register</a></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                
            </section>
        </div>
    )
}

export default About