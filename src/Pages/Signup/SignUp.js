import { useState, useRef } from "react"
import { Navigate } from "react-router-dom"
import "./SignUp.css"

const SignUp = () => {

    const [notChecked, setNotChecked] = useState(true)
    const [signedUp, setSignedUp] = useState(false)
    const [failed, setFailed] = useState(false)
    const inputNameRef = useRef("")
    const inputUserNameRef = useRef("")
    const inputEmailRef = useRef("")
    const inputPasswordRef = useRef("")
    const inputConfirmPasswordRef = useRef("")


    const checkTermsHandler = () => {
        setNotChecked(!notChecked)
    }


    const signUpHandler = (event) => {
        event.preventDefault()


        if(inputEmailRef.current.value.trim() === 0) {
            setFailed(true)

            return
        } else if (inputNameRef.current.value === 0) {
            setFailed(true)

            return 
        } else if (inputPasswordRef.current.value.length <= 6) {
            setFailed(true)

            return
        }

        var raw = JSON.stringify({
            "name": inputNameRef.current.value,
            "email": inputEmailRef.current.value,
            "password": inputPasswordRef.current.value,
            "username": inputUserNameRef.current.value
        });

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            body: raw,
            headers: myHeaders,
        };

        fetch("http://localhost:5000/api/users", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                localStorage.setItem('token' , true)
                setSignedUp(true)
            })
            .catch(error => {
                setFailed(true)
                setSignedUp(false)
                console.log('error', error)
            });
    }

    return (
        <div className="sign-up-main-container">

            {signedUp && <Navigate to="/home-page" />}

            <img src="https://images.unsplash.com/photo-1533122250115-6bb28e9a48c3?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735" alt="" className="left-image-signup" />

            <div className="sign-up-container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" id="logo-signup" alt="" />

                <form className="sign-up-form-container" onSubmit={signUpHandler}>
                    <input required ref={inputEmailRef} placeholder="Enter your email address" type="email" className="input-sign-up" />
                    <input required ref={inputNameRef} placeholder="Enter your name" type="text" className="input-sign-up" />
                    <input required ref={inputUserNameRef} placeholder="Pick a username" type="text" className="input-sign-up" />
                    <input required ref={inputPasswordRef} placeholder="Password" type="Password" className="input-sign-up password" />
                    <input required ref={inputConfirmPasswordRef} placeholder="Confirm Password" type="password" className="input-sign-up" />
                    <button type="submit" className="sign-up-btn">Sign up</button>
                </form>

                <p className="terms-and-conditions"><img src={!notChecked ? "https://www.svgrepo.com/show/13650/success.svg" : "https://www.svgrepo.com/show/111218/error.svg"} className="icon-sign-up-terms" alt="Sign up terms" onClick={checkTermsHandler} />By signing up you automatically accept all our terms and conditions</p>
                {failed && <p className="warning-messages">Please check your inputs.</p>}
                {notChecked && <p className="warning-messages">Agree to the terms and conditions to continue.</p>}

            </div>
        </div>
    )
}

export default SignUp