import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import '../css/account.css'


const CreateAccount = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfPassword] = useState('');
    const [username, setUsername] = useState('');


    const notify = (message) => toast(message);

    const signupHandler = async (e) => {
        e.preventDefault();
        if (username === '') {
            notify('Username field is required!');
        }
        else if (email === '') {
            notify('Email field is required!');
        } else if (password === '') {
            notify('Password field is required!');
        } else if (confpassword === '') {
            notify('Confirm Password field is required!');
        } else {
            if (password !== confpassword) {
                notify('Password and Confirm Password do not match!');
            } else {

                const res = await fetch('http://localhost:8080/api/v1/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password,
                        confirmPassword: confpassword
                    })
                })
                const data = await res.json();

                if (data.status) {
                    navigate('/loginAccount');
                    notify(data.message);
                } else {
                    typeof(data.message) === "string" ? notify(data.message): notify(data.message[0].message);
                    console.log("sbnsbsb")
                }
            }
        }


    };

    return (

        <div className="containers sign-up-mode">
            <ToastContainer />

            <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" className="sign-in-form">
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user" />
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope" />
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock" />
                            <input type="password" placeholder="Password" />
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

                    <form action="#" className="sign-up-form" onSubmit={signupHandler}>
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user" />
                            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-user" />
                            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock" />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confpassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                            />
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
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!</p>
                        <button className="btns transparent" id="sign-up-btn" onClick={() => { }}>
                            Sign up
                        </button>
                    </div>
                    <img src="img/log.svg" className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>Proceed to Our Login Page where you can directly enter the application!</p>
                        <button className="btns transparent" onClick={() => navigate('/loginAccount')}>
                            Sign in
                        </button>
                    </div>
                    <img src="img/register.svg" className="image" alt="" />
                </div>
            </div>
        </div>
    );
}

export default CreateAccount