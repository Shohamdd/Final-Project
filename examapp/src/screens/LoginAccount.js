import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useStateValue } from '../StateProvider';
import '../css/account.css'



const LoginAccount = () => {
    let navigate = useNavigate();
    let [{ user }, dispatch] = useStateValue();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(true);


    const notify = (message) => toast(message);

    const loginHandler = async (e) => {
        e.preventDefault();
        if (email === '') {
            notify('Username/Email field is required!');
        } else if (password === '') {
            notify('Password field is required!');
        } else {
            const res = await fetch('http://localhost:8080/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await res.json();
            console.log(data)
            if (data.status) {
                navigate('/quizDetail');
                notify(data.message);
                dispatch({
                    type: 'SET_USER',
                    user: data.data[0]
                })
                localStorage.setItem('useremail', data.data[0].Email)
            } else {
                typeof (data.message) === "string" ? notify(data.message) : notify(data.message[0].message);
                console.log("sbnsbsb")
            }

        }


    };

    return (

        <div className="containers">
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" className="sign-in-form" onSubmit={loginHandler}>
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-envelope" />
                            <input type="email" placeholder="Username / Email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock" />
                            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <input type="submit" className="btns" defaultValue="Sign up" />
                        <p className="social-text">Or Sign up with social platforms</p>
                        <div className="social-media">
                            <a href="#" className="social-icon">
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-twitter" />
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-google" />
                            </a>
                            <a href="#" className="social-icon">
                                <i className="fab fa-linkedin-in" />
                            </a>
                        </div>
                    </form>


                </div>
            </div>
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>Please create your own personal account and then return to login page !</p>
                        <button className="btns transparent" id="sign-up-btn" onClick={() => navigate('/')}>
                            Sign up
                        </button>
                    </div>
                    <img src="img/log.svg" className="image" alt="" />
                </div>
            </div>
        </div>
    );

}
export default LoginAccount